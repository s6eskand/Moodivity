from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import UserLogsSerializer
from ..models import UserLogs
import argparse
from google.cloud import language_v1
from google.cloud import speech, storage
from django.conf import settings
from datetime import datetime
import json
import base64
import wave
import os


def analyze(score):
    if -1.0 < score < -0.6:
        return 'verySad'

    if -0.6 < score < -0.2:
        return 'sad'

    if -0.2 < score < 0.2:
        return 'neutral'

    if 0.2 < score < 0.6:
        return 'happy'

    if 0.6 < score < 1.0:
        return 'veryHappy'


def sentiment(content):
    # """Run a sentiment analysis request on text within a passed filename."""
    client = language_v1.LanguageServiceClient.from_service_account_json(settings.KEY_DIR)

    document = language_v1.Document(content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
    annotations = client.analyze_sentiment(request={'document': document})
    score = annotations.document_sentiment.score

    return score


def transcribe(gcs_uri):
    """Asynchronously transcribes the audio file specified by the gcs_uri."""

    client = speech.SpeechClient.from_service_account_json(settings.KEY_DIR)

    audio = speech.RecognitionAudio(
        uri=gcs_uri
    )
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=41800,
        language_code="en-US"
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = operation.result()

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    num_results = 0
    average_confidence = 0
    final_string = ""
    for result in response.results:
        best_alternative = result.alternatives[0]

        transcript = best_alternative.transcript
        final_string += " " + transcript

        confidence = best_alternative.confidence
        num_results += 1
        average_confidence += confidence

    result = {
        "final_string": final_string,
        "confidence": 10
    }

    return result


def upload_blob(source_file_name, destination_blob_name, b64text):
    last2char = b64text[len(b64text) - 2]
    if last2char == "==":
        wav_file_bytes = base64.b64decode(b64text)
    elif "=" in last2char:
        wav_file_bytes = base64.b64decode(b64text + "=")
    else:
        wav_file_bytes = base64.b64decode(b64text + "==")

    if os.path.exists(source_file_name):
        os.remove(source_file_name)

    wave_file = wave.open(source_file_name, "wb")
    wave_file.setnchannels(1)
    wave_file.setsampwidth(2)
    wave_file.setframerate(41800)
    wave_file.writeframesraw(wav_file_bytes)

    """Uploads a file to the bucket."""
    bucket_name = "moodivity-speechfiles"

    storage_client = storage.Client.from_service_account_json(settings.KEY_DIR)
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )

    wave_file.close()

    # return transcribe("gs://moodivity-speechfiles/"+destination_blob_name)
    return transcribe("gs://moodivity-speechfiles/" + destination_blob_name)


class UserLogsCreateView(views.APIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, pk=None):
        queryset = UserLogs.objects.filter(owner=self.request.user)
        serializer = UserLogsSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        dictTemp = {
            "mood": "",
            "date": "",
            "log": "",
            "analysis": "",
            "owner": 0,
            "goalStatus": 0
        }
        text = upload_blob("speech3.wav", "ryanasd.wav", request.data["audio"])
        mood = sentiment(text["final_string"])
        dictTemp["mood"] = mood
        dictTemp["analysis"] = analyze(mood)
        dictTemp["date"] = str(datetime.now())
        dictTemp["log"] = text["final_string"]
        dictTemp["owner"] = request.data["owner"]
        dictTemp["goalStatus"] = request.data["goalStatus"]
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
        return Response({"Success": "true"})