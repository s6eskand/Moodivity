from rest_framework import views, status
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from ..models import UserProfile
import argparse
from google.cloud import language_v1
from django.conf import settings

class UserProfileListCreateView(views.APIView):

    def get(self, request, pk=None):
        queryset = UserProfile.objects.all()
        serializer = UserProfileSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            "error": "invalid data"
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        profile = UserProfile.objects.get(pk=pk)
        serializer = UserProfileSerializer(profile, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({
            "error": "could not update"
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        UserProfile.objects.filter(pk=pk).delete()
        return Response({ "Success": "true"})
