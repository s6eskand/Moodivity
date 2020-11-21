from .views import (
    UserLogsCreateView
)
from django.urls import path

urlpatterns = [
    path('', UserLogsCreateView.as_view()),
    path('edit/<pk>', UserLogsCreateView.as_view()),
    path('delete/<pk>', UserLogsCreateView.as_view())
]