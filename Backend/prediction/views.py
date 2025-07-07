from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .ml_model import predict_disease
from .models import Disease, Doctor, PredictionRecord
from rest_framework.permissions import IsAuthenticated
import json
from .serializers import AppointmentSerializer, DoctorSerializer
from django.db.models import Q
import google.generativeai as genai
from django.conf import settings

# Disease information from gemini api
genai.configure(api_key=settings.GEMINI_API_KEY)

def get_disease_info(disease_name):
    """Fetch disease info from Gemini API"""
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    prompt = f"""Provide medical information about {disease_name} as a pure JSON object with exactly these 3 fields:
        1. "description": A 1-2 sentence overview of the disease
        2. "common_symptoms": An array of 5-6 most common symptoms
        3. "prevention_tips": An array of 5-6 prevention strategies

        Important requirements:
        - Return ONLY the raw JSON object 
        - Do NOT include any Markdown formatting (no ```json or ```)
        - Do NOT include any explanatory text
        - Maintain this exact structure:
        {{
            "description": "",
            "common_symptoms": [],
            "prevention_tips": []
        }}

        Example output for "Migraine":
        {{
            "description": "Migraine is...",
            "common_symptoms": ["Symptom 1", "Symptom 2"],
            "prevention_tips": ["Tip 1", "Tip 2"]
        }}"""
    
    try:
        response = model.generate_content(prompt)

        if not response.text:
            print(f"Empty response from Gemini for {disease_name}")
            return None
        print("Raw Gemini response:", response.text)
        return response.text
    except Exception as e:
        print(f"Gemini API error for {disease_name}: {str(e)}")
        return None
    

# Create your views here.

class PredictionHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        """Get prediction history for the authenticated user"""
        try:
            # Get all prediction records for the current user
            predictions = PredictionRecord.objects.filter(user=request.user)
            
            history_data = []
            for prediction in predictions:
                # Parse symptoms from JSON string
                try:
                    symptoms = json.loads(prediction.symptoms)
                except (json.JSONDecodeError, TypeError):
                    symptoms = prediction.symptoms
                
                history_data.append({
                    'id': prediction.id,
                    'disease_name': prediction.predicted_disease_name,
                    'symptoms': symptoms if isinstance(symptoms, str) else ', '.join(symptoms),
                    'probability': prediction.probability,
                    'timestamp': prediction.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                    'doctor_name': prediction.recommended_doctor.name if prediction.recommended_doctor else None,
                    'doctor_specialization': prediction.recommended_doctor.get_specialization_display() if prediction.recommended_doctor else None,
                })
            
            return Response({
                'data': history_data,
                'count': len(history_data)
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': 'Failed to fetch prediction history',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DiseasePredictionView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        data = request.data
        symptoms = data.get("symptoms", [])
        
        # Get disease prediction from ML model
        ml_result = predict_disease(symptoms)
        if "error" in ml_result:
            return Response({"error": ml_result["error"]}, status=status.HTTP_400_BAD_REQUEST)
        
        # Process all predicted diseases and get doctors for each
        all_recommended_doctors = []
        disease_doctors_map = {}
        
        for prediction in ml_result['predictions']:
            disease_name = prediction['disease']
            probability = prediction['probability']
            
            # Try to get the disease from database, create if it doesn't exist
            try:
                disease_obj = Disease.objects.get(name__iexact=disease_name)
            except Disease.DoesNotExist:
                # Create the disease with a default specialization
                disease_obj = Disease.objects.create(
                    name=disease_name,
                    specialization='general medicine'
                )
            
            # Get doctors for this disease's specialization
            doctors_for_disease = Doctor.objects.filter(
                specialization=disease_obj.specialization
            )[:2]  # Get up to 2 doctors per disease
            
            # Add to the map
            disease_doctors_map[disease_name] = {
                'disease': disease_obj,
                'doctors': list(doctors_for_disease),
                'probability': probability
            }
            
            # Add to all recommended doctors (avoid duplicates)
            for doctor in doctors_for_disease:
                if doctor not in all_recommended_doctors:
                    all_recommended_doctors.append(doctor)
        
        # Get the top disease for the main prediction record
        top_disease = ml_result['predictions'][0]['disease']
        top_disease_obj = disease_doctors_map[top_disease]['disease']
        top_probability = ml_result['predictions'][0]['probability']
        
        # Get disease info from Gemini API for the top disease
        disease_info = get_disease_info(top_disease)
        print("Disease info from Gemini:", disease_info)
        try:
            disease_info = json.loads(disease_info) if disease_info else None
        except json.JSONDecodeError:
            disease_info = None
        
        # If Gemini API fails, provide basic disease info
        if not disease_info:
            disease_info = {
                "description": f"{top_disease} is a medical condition that requires professional diagnosis and treatment.",
                "common_symptoms": ["Please consult with a healthcare professional for accurate symptom assessment"],
                "prevention_tips": ["Maintain a healthy lifestyle", "Regular check-ups", "Follow medical advice", "Stay hydrated", "Get adequate rest"]
            }

        # Store the prediction record (use first doctor if available)
        first_doctor = all_recommended_doctors[0] if all_recommended_doctors else None
        prediction = PredictionRecord.objects.create(
            user=request.user,
            symptoms=json.dumps(symptoms),
            predicted_disease_name=top_disease,  
            predicted_disease=top_disease_obj, 
            probability=top_probability,
            recommended_doctor=first_doctor
        )
        
        # Prepare recommended doctors data with disease associations
        recommended_doctors_data = []
        for doctor in all_recommended_doctors:
            # Find which diseases this doctor specializes in
            doctor_diseases = []
            for disease_name, disease_data in disease_doctors_map.items():
                if doctor in disease_data['doctors']:
                    doctor_diseases.append({
                        'name': disease_name,
                        'probability': disease_data['probability']
                    })
            
            recommended_doctors_data.append({
                'id': doctor.id,
                'name': doctor.name,
                'specialization': doctor.get_specialization_display(),
                'related_diseases': doctor_diseases
            })
        
        # Prepare disease-specific doctor recommendations
        disease_doctors_recommendations = {}
        for disease_name, disease_data in disease_doctors_map.items():
            disease_doctors_recommendations[disease_name] = [
                {
                    'id': doctor.id,
                    'name': doctor.name,
                    'specialization': doctor.get_specialization_display(),
                }
                for doctor in disease_data['doctors']
            ]
        
        response_data = {
            'predicted_disease': ml_result['predictions'],
            'info': disease_info,
            'timestamp': prediction.timestamp.isoformat(),
            'recommended_doctors': recommended_doctors_data,
            'disease_doctors': disease_doctors_recommendations,
            'recommended_doctor': recommended_doctors_data[0] if recommended_doctors_data else None  # Keep for backward compatibility
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
    
# Booking Appointment
class AppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        """Create a new appointment for the current user"""
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            # Associate the appointment with the current user
            appointment = serializer.save(user=request.user)
            
            # Return the created appointment details
            response_data = {
                'id': appointment.id,
                'doctor_name': appointment.doctor.name,
                'doctor_specialization': appointment.doctor.specialization,
                'appointment_date': appointment.appointment_date,
                'preferred_time': appointment.get_preferred_time_display(),
                'message': appointment.message,
                'created_at': appointment.created_at
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# List all doctors
class DoctorListView(APIView):
    def get(self, request, format=None):
        # Get query parameters
        specialization = request.query_params.get('specialization')
        search_query = request.query_params.get('search')
        
        # Start with all doctors
        doctors = Doctor.objects.all()
        
        # Apply filters if provided
        if specialization:
            doctors = doctors.filter(specialization=specialization)
        
        if search_query:
            doctors = doctors.filter(
                Q(name__icontains=search_query) |
                Q(specialization__icontains=search_query)
            )
        
        # Order results
        doctors = doctors.order_by('name')
        
        # Serialize the data
        serializer = DoctorSerializer(doctors, many=True)
        
        # Return the response
        return Response(serializer.data, status=status.HTTP_200_OK)
    



