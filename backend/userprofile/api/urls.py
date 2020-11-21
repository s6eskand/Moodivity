from .views import (
    UserProfileListCreateView
)
from django.urls import path

urlpatterns = [
    path('', UserProfileListCreateView.as_view()),
    path('<pk>', UserProfileListCreateView.as_view())
]