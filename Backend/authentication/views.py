from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from authentication.serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserProfileSerializer, 
    ChangeUserPasswordSerializer, 
    SendPasswordResetEmailSerializer, 
    UserPasswordResetSerializer, 
    DoctorApprovalSerializer
)
from django.contrib.auth import authenticate
from authentication.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from authentication.models import User
from django.utils import timezone
from firebase_admin import auth

# Generate token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create your views here.

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({
                'token': token,
                'name': user.name,
                'role': user.role,
                'msg': 'Registration Success'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({
                    'token': token,
                    'name': user.name,
                    'role': user.role,
                    'msg': 'Login Success'
                }, status=status.HTTP_200_OK)
            else:
                return Response({'errors' : {'non_field_errors':['Email or Password is not valid']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FirebaseGoogleAuthView(APIView):
    """
    Handle Google Sign-In via Firebase.
    Receives a Firebase ID token from the frontend, verifies it,
    and then creates a new user or logs in an existing user.
    """
    def post(self, request, *args, **kwargs):
        id_token = request.data.get('id_token')
        if not id_token:
            return Response({'detail': 'ID token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            email = decoded_token.get('email')
            name = decoded_token.get('name', '')

            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'firebase_uid': uid,
                    'username': email,
                    'name': name,
                }
            )

            if created:
                user.role = 'PATIENT'
                user.save()

            tokens = get_tokens_for_user(user)
            user_serializer = UserProfileSerializer(user) 

            return Response({
                'token': tokens,
                'role': user.role,
                'name': user.name,
                'user_details': user_serializer.data,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': f'Authentication error: {str(e)}'}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Profile Updated Successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        serializer = ChangeUserPasswordSerializer(data=request.data, context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Changed Successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password reset link sent. Please check your email'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context = {'uid':uid, 'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password reset successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# User Management Views (Admin Only)
class AllUsersView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        users = User.objects.all().order_by('-registered_date')
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, user_id, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            user = User.objects.get(id=user_id)
            is_active = request.data.get('is_active', user.is_active)
            user.is_active = is_active
            user.save()
            return Response({'msg': f'User status updated successfully', 'user_id': user.id, 'is_active': user.is_active}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class UserRoleUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, user_id, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            user = User.objects.get(id=user_id)
            new_role = request.data.get('role', user.role)
            valid_roles = ['PATIENT', 'DOCTOR', 'HOSPITAL_ADMIN']
            if new_role not in valid_roles:
                return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)
            user.role = new_role
            user.save()
            return Response({'msg': f'User role updated successfully', 'user_id': user.id, 'role': user.role}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, user_id, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            user = User.objects.get(id=user_id)
            if user.id == request.user.id:
                return Response({'error': 'Cannot delete your own account'}, status=status.HTTP_400_BAD_REQUEST)
            user.delete()
            return Response({'msg': 'User deleted successfully'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

# Doctor Approval Views (Admin Only)
class PendingDoctorsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        doctors = User.objects.filter(role='DOCTOR').order_by('-registered_date')
        serializer = DoctorApprovalSerializer(doctors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DoctorApproveView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, doctor_id, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            doctor = User.objects.get(id=doctor_id, role='DOCTOR')
            try:
                doctor.approval_status = 'APPROVED'
                doctor.approved_by = request.user
                doctor.approved_at = timezone.now()
            except AttributeError:
                pass
            doctor.save()
            return Response({'msg': f'Doctor {doctor.name} approved successfully', 'doctor_id': doctor.id, 'approval_status': getattr(doctor, 'approval_status', 'APPROVED')}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

class DoctorRejectView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, doctor_id, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            doctor = User.objects.get(id=doctor_id, role='DOCTOR')
            rejection_reason = request.data.get('rejection_reason', '')
            try:
                doctor.approval_status = 'REJECTED'
                doctor.rejection_reason = rejection_reason
                doctor.approved_by = request.user
                doctor.approved_at = timezone.now()
            except AttributeError:
                pass
            doctor.save()
            return Response({'msg': f'Doctor {doctor.name} rejected', 'doctor_id': doctor.id, 'approval_status': getattr(doctor, 'approval_status', 'REJECTED'), 'rejection_reason': getattr(doctor, 'rejection_reason', rejection_reason)}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

# Patient Approval Views (Admin Only)
class PendingPatientsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        patients = User.objects.filter(role='PATIENT').order_by('-registered_date')
        serializer = UserProfileSerializer(patients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PatientApproveView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, patient_id, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            patient = User.objects.get(id=patient_id, role='PATIENT')
            try:
                patient.approval_status = 'APPROVED'
                patient.approved_by = request.user
                patient.approved_at = timezone.now()
            except AttributeError:
                pass
            patient.save()
            return Response({'msg': f'Patient {patient.name} approved successfully', 'patient_id': patient.id, 'approval_status': getattr(patient, 'approval_status', 'APPROVED')}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

class PatientRejectView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, patient_id, format=None):
        if request.user.role != 'HOSPITAL_ADMIN':
            return Response({'error': 'Access denied. Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            patient = User.objects.get(id=patient_id, role='PATIENT')
            rejection_reason = request.data.get('rejection_reason', '')
            try:
                patient.approval_status = 'REJECTED'
                patient.rejection_reason = rejection_reason
                patient.approved_by = request.user
                patient.approved_at = timezone.now()
            except AttributeError:
                pass
            patient.save()
            return Response({'msg': f'Patient {patient.name} rejected', 'patient_id': patient.id, 'approval_status': getattr(patient, 'approval_status', 'REJECTED'), 'rejection_reason': getattr(patient, 'rejection_reason', rejection_reason)}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

