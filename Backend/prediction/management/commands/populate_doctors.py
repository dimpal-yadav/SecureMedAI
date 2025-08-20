from django.core.management.base import BaseCommand
from prediction.models import Doctor

class Command(BaseCommand):
    help = 'Populate the database with sample doctors for each specialization'

    def handle(self, *args, **options):
        # Sample doctors for each specialization
        doctors_data = [
            # Dermatology
            {'name': 'Dr. Sarah Johnson', 'specialization': 'dermatology'},
            {'name': 'Dr. Michael Chen', 'specialization': 'dermatology'},
            
            # Allergy and Immunology
            {'name': 'Dr. Emily Rodriguez', 'specialization': 'allergy and immunology'},
            {'name': 'Dr. David Kim', 'specialization': 'allergy and immunology'},
            
            # Gastroenterology
            {'name': 'Dr. James Wilson', 'specialization': 'gastroenterology'},
            {'name': 'Dr. Lisa Thompson', 'specialization': 'gastroenterology'},
            
            # Infectious Diseases
            {'name': 'Dr. Robert Martinez', 'specialization': 'infectious diseases'},
            {'name': 'Dr. Jennifer Lee', 'specialization': 'infectious diseases'},
            
            # Endocrinology
            {'name': 'Dr. Thomas Brown', 'specialization': 'endocrinology'},
            {'name': 'Dr. Amanda Davis', 'specialization': 'endocrinology'},
            
            # Cardiology
            {'name': 'Dr. Christopher Garcia', 'specialization': 'cardiology'},
            {'name': 'Dr. Michelle White', 'specialization': 'cardiology'},
            
            # Pulmonology
            {'name': 'Dr. Daniel Anderson', 'specialization': 'pulmonology'},
            {'name': 'Dr. Rachel Taylor', 'specialization': 'pulmonology'},
            
            # Neurology
            {'name': 'Dr. Kevin Moore', 'specialization': 'neurology'},
            {'name': 'Dr. Stephanie Clark', 'specialization': 'neurology'},
            
            # Rheumatology
            {'name': 'Dr. Andrew Lewis', 'specialization': 'rheumatology'},
            {'name': 'Dr. Nicole Hall', 'specialization': 'rheumatology'},
            
            # Urology
            {'name': 'Dr. Matthew Young', 'specialization': 'urology'},
            {'name': 'Dr. Jessica Allen', 'specialization': 'urology'},
            
            # Hepatology
            {'name': 'Dr. Ryan King', 'specialization': 'hepatology'},
            {'name': 'Dr. Samantha Wright', 'specialization': 'hepatology'},
            
            # Proctology
            {'name': 'Dr. Brandon Scott', 'specialization': 'proctology'},
            {'name': 'Dr. Victoria Green', 'specialization': 'proctology'},
        ]

        created_count = 0
        for doctor_data in doctors_data:
            # Check if doctor already exists
            if not Doctor.objects.filter(name=doctor_data['name']).exists():
                Doctor.objects.create(**doctor_data)
                created_count += 1
                self.stdout.write(f'Created doctor: {doctor_data["name"]} ({doctor_data["specialization"]})')
            else:
                self.stdout.write(f'Doctor already exists: {doctor_data["name"]}')

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} new doctors. Total doctors in database: {Doctor.objects.count()}')
        ) 