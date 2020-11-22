from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import UserLogsSerializer
from ..models import UserLogs
import argparse
from google.cloud import language_v1
from django.conf import settings
from datetime import datetime
import json

def analyze(score):

    if score > -1.0 and score < -0.6:
        return 'very sad'

    if score > -0.6 and score < -0.2:
        return 'sad'

    if score > -0.2 and score < 0.2:
        return 'neutral'

    if score > 0.2 and score < 0.6:
        return 'happy'

    if score > 0.6 and score < 1.0:
        return 'very happy'

    # analysis = {
    #             xrange(-10, -6) : 'very sad',
    #             xrange(-6, -2) : 'sad',
    #             xrange(-2, 2) : 'neutral',
    #             xrange(2, 6) : 'happy',
    #             xrange(6, 10) : 'very happy'
    #             }
    # print("****************")
    # print(analysis[8])
    # print("****************")
    # return analysis[8]


def sentiment(content):
    # """Run a sentiment analysis request on text within a passed filename."""
    client = language_v1.LanguageServiceClient.from_service_account_json(settings.KEY_DIR)

    document = language_v1.Document(content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
    annotations = client.analyze_sentiment(request={'document': document})
    score = annotations.document_sentiment.score
    
    return score

class UserLogsCreateView(views.APIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, pk=None):
        queryset = UserLogs.objects.filter(owner=self.request.user)
        serializer = UserLogsSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        dictTemp = request.data
        mood = sentiment(dictTemp["log"])
        dictTemp["mood"] = mood
        analysis = analyze(mood)
        dictTemp["analysis"] = analysis
        serializer = UserLogsSerializer(data=dictTemp)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            "error": "invalid data"
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        queryInit = UserLogs.objects.filter(owner=self.request.user)
        profile = queryInit.get(pk=pk)
        serializer = UserLogsSerializer(profile, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({
            "error": "could not update"
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        queryInit = UserLogs.objects.filter(owner=self.request.user)
        queryInit.get(pk=pk).delete()
        return Response({ "Success": "true"})