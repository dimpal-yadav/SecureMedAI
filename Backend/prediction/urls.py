from django.urls import path
from prediction.views import DiseasePredictionView
from prediction.views import AppointmentView
from prediction.views import DoctorListView
from prediction.views import PredictionHistoryView

urlpatterns = [
    path('predict/', DiseasePredictionView.as_view(),name='predict'),
    path('appointment/', AppointmentView.as_view(),name='appointment'),
    path('doctors/', DoctorListView.as_view(),name='doctors-list'),
    path('predictionhistory/', PredictionHistoryView.as_view(),name='prediction-history'),
]