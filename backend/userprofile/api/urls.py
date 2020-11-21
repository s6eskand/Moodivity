from .views import (
    UserProfileListCreateView
)
from django.urls import path

urlpatterns = [
    path('', UserProfileListCreateView.as_view()),
    path('edit/<pk>', UserProfileListCreateView.as_view()),
    path('delete/<pk>', UserProfileListCreateView.as_view()),
]