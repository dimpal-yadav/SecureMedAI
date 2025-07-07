from django.urls import path
from authentication.views import (
    UserRegistrationView,
    UserLoginView,
    UserProfileView,
    UserProfileUpdateView,
    UserChangePasswordView,
    SendPasswordResetEmailView,
    UserPasswordResetView,
    AllUsersView,
    UserStatusUpdateView,
    UserRoleUpdateView,
    UserDeleteView,
    PendingDoctorsView,
    DoctorApproveView,
    DoctorRejectView,
    PendingPatientsView,
    PatientApproveView,
    PatientRejectView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('profile/', UserProfileView.as_view(),name='profile'),
    path('profile/update/', UserProfileUpdateView.as_view(),name='profileupdate'),
    path('changepassword/', UserChangePasswordView.as_view(),name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(),name='resetpasswordemail'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(),name='resetpassword'),
    
    # User Management URLs (Admin only)
    path('all-users/', AllUsersView.as_view(), name='all-users'),
    path('<int:user_id>/status/', UserStatusUpdateView.as_view(), name='user-status-update'),
    path('<int:user_id>/role/', UserRoleUpdateView.as_view(), name='user-role-update'),
    path('<int:user_id>/', UserDeleteView.as_view(), name='user-delete'),
    
    # Doctor Approval URLs (Admin Only)
    path('pending-doctors/', PendingDoctorsView.as_view(), name='pending-doctors'),
    path('doctor/<int:doctor_id>/approve/', DoctorApproveView.as_view(), name='doctor-approve'),
    path('doctor/<int:doctor_id>/reject/', DoctorRejectView.as_view(), name='doctor-reject'),
    
    # Patient Approval URLs (Admin Only)
    path('pending-patients/', PendingPatientsView.as_view(), name='pending-patients'),
    path('patient/<int:patient_id>/approve/', PatientApproveView.as_view(), name='patient-approve'),
    path('patient/<int:patient_id>/reject/', PatientRejectView.as_view(), name='patient-reject'),
]
