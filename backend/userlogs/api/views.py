from rest_framework import views, status
from rest_framework.response import Response
from .serializers import UserLogsSerializer
from ..models import UserLogs
import argparse
from google.cloud import language_v1
from google.cloud import speech
from django.conf import settings
from datetime import datetime
import json
import base64
import wave

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

def transcribe(gcs_uri):
    """Asynchronously transcribes the audio file specified by the gcs_uri."""

    wav_file_bytes = base64.b64decode(gcs_uri)
    # wav_file_bytes = wav_file_bytes.encode("utf-8")
    # wave_file = wave.open("speech.wav", "wb")
    # wave_file.setnchannels(1)
    # wave_file.setsampwidth(2)
    # wave_file.setframerate(44100)
    # wave_file.writeframesraw(wav_file_bytes)

    # wave_file_bytes2 = base64.b64decode(wave_file)

    # base64_img_bytes = gcs_uri.encode('utf-8')
    # print("*************************")
    # print(len(base64_img_bytes))

    # with open('decoded_image.wav', 'wb') as file_to_save:
    #     decoded_image_data = base64.decodebytes(base64_img_bytes)
    #     file_to_save.write(decoded_image_data)

    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(
        uri=wav_file_bytes
    )
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        language_code="en-US",
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = operation.result(timeout=300)

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
            "confidence": average_confidence/num_results
        }

        return result

    print(f"Transcript: {final_string}")
    print(f"Confidence: {average_confidence/num_results:.0%}")

class UserLogsCreateView(views.APIView):

    def get(self, request, pk=None):
        queryset = UserLogs.objects.all()
        serializer = UserLogsSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        dictTemp = request.data
        text = transcribe(dictTemp["audio"])
        mood = sentiment(text["final_string"])
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