from rest_framework import views, status
from rest_framework.response import Response
from .serializers import UserLogsSerializer
from ..models import UserLogs
import argparse
from google.cloud import language_v1
from django.conf import settings
from datetime import datetime
import json

def analyze(content):
    # """Run a sentiment analysis request on text within a passed filename."""
    client = language_v1.LanguageServiceClient.from_service_account_json(settings.KEY_DIR)

    document = language_v1.Document(content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
    annotations = client.analyze_sentiment(request={'document': document})

    magnitude = annotations.document_sentiment.magnitude
    
    return magnitude

class UserLogsCreateView(views.APIView):

    def get(self, request, pk=None):
        queryset = UserLogs.objects.all()
        serializer = UserLogsSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        dictTemp = request.data
        mood = analyze(dictTemp["log"])
        dictTemp["mood"] = mood
        serializer = UserLogsSerializer(data=dictTemp)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            "error": "invalid data"
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        profile = UserLogs.objects.get(pk=pk)
        serializer = UserLogsSerializer(profile, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({
            "error": "could not update"
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        UserLogs.objects.filter(pk=pk).delete()
        return Response({ "Success": "true"})