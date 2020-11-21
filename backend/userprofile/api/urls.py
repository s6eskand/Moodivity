from .views import (
    UserProfileListCreateView,
    MoodListCreateView
)
from django.urls import path

urlpatterns = [
    path('', UserProfileListCreateView.as_view()),
    path('delete/<pk>', UserProfileListCreateView.as_view()),
    path('addMood/<pk>', MoodListCreateView.as_view())
]