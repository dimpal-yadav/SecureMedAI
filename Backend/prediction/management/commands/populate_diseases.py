import pandas as pd
import os
from django.core.management.base import BaseCommand
from prediction.models import Disease

class Command(BaseCommand):
    help = 'Populate the database with diseases from the ML dataset'

    def handle(self, *args, **options):
        # Path to the dataset file
        dataset_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))), 'ML Model', 'dataset.csv')
        
        if not os.path.exists(dataset_path):
            self.stdout.write(self.style.ERROR(f'Dataset file not found at {dataset_path}'))
            return

        try:
            # Read the dataset
            df = pd.read_csv(dataset_path)
            
            # Get unique diseases
            unique_diseases = df['Disease'].unique()
            
            # Define disease to specialization mapping
            disease_specialization_map = {
                'Fungal infection': 'dermatology',
                'Allergy': 'allergy and immunology',
                'GERD': 'gastroenterology',
                'Chronic cholestasis': 'hepatology',
                'Drug Reaction': 'dermatology',
                'Peptic ulcer diseae': 'gastroenterology',
                'AIDS': 'infectious diseases',
                'Diabetes ': 'endocrinology',
                'Gastroenteritis': 'gastroenterology',
                'Bronchial Asthma': 'pulmonology',
                'Hypertension ': 'cardiology',
                'Migraine': 'neurology',
                'Cervical spondylosis': 'neurology',
                'Paralysis (brain hemorrhage)': 'neurology',
                'Jaundice': 'hepatology',
                'Malaria': 'infectious diseases',
                'Chicken pox': 'infectious diseases',
                'Dengue': 'infectious diseases',
                'Typhoid': 'infectious diseases',
                'hepatitis A': 'hepatology',
                'Hepatitis B': 'hepatology',
                'Hepatitis C': 'hepatology',
                'Hepatitis D': 'hepatology',
                'Hepatitis E': 'hepatology',
                'Alcoholic hepatitis': 'hepatology',
                'Tuberculosis': 'infectious diseases',
                'Common Cold': 'infectious diseases',
                'Pneumonia': 'pulmonology',
                'Dimorphic hemmorhoids(piles)': 'proctology',
                'Heart attack': 'cardiology',
                'Varicose veins': 'cardiology',
                'Hypothyroidism': 'endocrinology',
                'Hyperthyroidism': 'endocrinology',
                'Hypoglycemia': 'endocrinology',
                'Osteoarthristis': 'rheumatology',
                'Arthritis': 'rheumatology',
                '(vertigo) Paroymsal  Positional Vertigo': 'neurology',
                'Acne': 'dermatology',
                'Urinary tract infection': 'urology',
                'Psoriasis': 'dermatology',
                'Impetigo': 'dermatology'
            }

            # Create diseases in the database
            created_count = 0
            for disease_name in unique_diseases:
                # Clean the disease name (remove extra spaces)
                clean_disease_name = disease_name.strip()
                
                # Get specialization from mapping, default to 'general medicine'
                specialization = disease_specialization_map.get(clean_disease_name, 'general medicine')
                
                # Check if disease already exists
                if not Disease.objects.filter(name__iexact=clean_disease_name).exists():
                    Disease.objects.create(
                        name=clean_disease_name,
                        specialization=specialization
                    )
                    created_count += 1
                    self.stdout.write(f'Created disease: {clean_disease_name} ({specialization})')
                else:
                    self.stdout.write(f'Disease already exists: {clean_disease_name}')

            self.stdout.write(
                self.style.SUCCESS(f'Successfully created {created_count} new diseases. Total diseases in database: {Disease.objects.count()}')
            )

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error populating diseases: {str(e)}')) 