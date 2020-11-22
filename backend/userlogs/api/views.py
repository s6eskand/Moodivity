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

    if score > -1.0 and score < -0.6:
        return 'verySad'

    if score > -0.6 and score < -0.2:
        return 'sad'

    if score > -0.2 and score < 0.2:
        return 'neutral'

    if score > 0.2 and score < 0.6:
        return 'happy'

    if score > 0.6 and score < 1.0:
        return 'veryHappy'

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

<<<<<<< HEAD
=======
    wav_file_bytes = base64.b64decode(gcs_uri)
    # wav_file_bytes = wav_file_bytes.encode("utf-8")
    # wave_file = wave.open("speech.wav", "wb")
    # wave_file.setnchannels(1)
    # wave_file.setsampwidth(2)
    # wave_file.setframerate(44100)
    # wave_file.writeframesraw(wav_file_bytes)

>>>>>>> fe0f2f0... beginning transcribe()
    # wave_file_bytes2 = base64.b64decode(wave_file)

    # base64_img_bytes = gcs_uri.encode('utf-8')
    # print("*************************")
    # print(len(base64_img_bytes))

    # with open('decoded_image.wav', 'wb') as file_to_save:
    #     decoded_image_data = base64.decodebytes(base64_img_bytes)
    #     file_to_save.write(decoded_image_data)

<<<<<<< HEAD
    client = speech.SpeechClient.from_service_account_json(settings.KEY_DIR)

    audio = speech.RecognitionAudio(
        uri=gcs_uri
    )
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=41800,
        # audio_channel_count=2,
        language_code="en-US"
=======
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(
        uri=wav_file_bytes
    )
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        language_code="en-US",
>>>>>>> fe0f2f0... beginning transcribe()
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
<<<<<<< HEAD
    response = operation.result()
=======
    response = operation.result(timeout=300)
>>>>>>> fe0f2f0... beginning transcribe()

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    num_results = 0
    average_confidence = 0
    final_string = ""
<<<<<<< HEAD
    print("----------------")
    print(response)
    print("----------------")
    for result in response.results:
        best_alternative = result.alternatives[0]

        
        transcript = best_alternative.transcript
        print("----------------")
        print(transcript)
        final_string += " " + transcript
=======
    for result in response.results:
        best_alternative = result.alternatives[0]

        transcript = best_alternative.transcript
        final_string += " " + transcript

>>>>>>> fe0f2f0... beginning transcribe()
        confidence = best_alternative.confidence
        num_results += 1
        average_confidence += confidence

<<<<<<< HEAD
    # for result in response.results:
    #     best_alternative = result.alternatives[0]
    #     transcript = best_alternative.transcript
    #     confidence = best_alternative.confidence
    #     print("-" * 80)
    #     print(f"Transcript: {transcript}")
    #     print(f"Confidence: {confidence:.0%}")

    # print("************")
    # best_alternative = response.results[0].alternatives[0]
    # print(best_alternative)
    # best_alternative = response.results[1].alternatives[0]
    # print(best_alternative)
    # transcript = best_alternative.transcript
    # print("************") 
    result = {
        "final_string": final_string,
        "confidence": 10
    }

    # print(f"Transcript: {final_string}")
    # print(f"Confidence: {average_confidence/num_results:.0%}")
    return result


def upload_blob(source_file_name, destination_blob_name, b64text):
    print(len(b64text))
    wav_file_bytes = base64.b64decode(b64text)
    # wav_file_bytes = wav_file_bytes.encode("utf-8")
    # wave_file = wave.open(source_file_name, "rb")
    # wave_file.rewind()
    # wave_file.close()

    if os.path.exists(source_file_name):
        os.remove(source_file_name)
    
    wave_file = wave.open(source_file_name, "wb")
    wave_file.setnchannels(1)
    wave_file.setsampwidth(2)
    wave_file.setframerate(44100)
    wave_file.writeframesraw(wav_file_bytes)

    """Uploads a file to the bucket."""
    bucket_name = "moodivity-speechfiles"
    # source_file_name = source_file_name
    # destination_blob_name = destination_blob_name

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
    return transcribe("gs://moodivity-speechfiles/mlk.wav")

=======
        result = {
            "final_string": final_string,
            "confidence": average_confidence/num_results
        }

        return result

    print(f"Transcript: {final_string}")
    print(f"Confidence: {average_confidence/num_results:.0%}")
>>>>>>> fe0f2f0... beginning transcribe()

class UserLogsCreateView(views.APIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, pk=None):
        queryset = UserLogs.objects.filter(owner=self.request.user)
        serializer = UserLogsSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
<<<<<<< HEAD
        dictTemp = {
            "mood" : "",
            "date" : "",
            "log" : "",
            "analysis" : "",
            "owner" : 0,
            "goalStatus" : 0
        }
        text = upload_blob("speech3.wav", "ryanasd.wav", request.data["audio"])
=======
        dictTemp = request.data
        text = transcribe(dictTemp["audio"])
>>>>>>> fe0f2f0... beginning transcribe()
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
        return Response({ "Success": "true"})