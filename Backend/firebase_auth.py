# Backend/authentication/firebase_auth.py
from firebase_admin import auth
from rest_framework import authentication
from rest_framework import exceptions
from .models import User  # Your custom user model

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        # The token is expected to be in the format "Bearer <token>"
        try:
            prefix, token = auth_header.split(' ')
            if prefix.lower() != 'bearer':
                raise ValueError("Invalid token prefix")
        except (ValueError, AttributeError):
            raise exceptions.AuthenticationFailed('Invalid token header. No credentials provided.')

        try:
            decoded_token = auth.verify_id_token(token)
            uid = decoded_token['uid']
            email = decoded_token.get('email')
        except Exception:
            raise exceptions.AuthenticationFailed('Invalid Firebase ID token.')

        # Get or create a Django user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={'firebase_uid': uid, 'username': email} # Add firebase_uid to your user model
        )

        return (user, None)