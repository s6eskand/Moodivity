# from google.cloud import language_v1
# import os

# os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="../../../Work/Others/Moodivity-fb12d231d9c7.json"

# content = "I really wanted to love 'Bladerunner' but ultimately I couldn't get myself to appreciate it fully. However, you may like it if you're into science fiction, especially if you're interested in the philosophical exploration of what it means to be human or machine. Some of the gizmos like the flying cars and the Vouight-Kampff machine(which seemed very steampunk), were quite cool."

# def analyze(content):
#     """Run a sentiment analysis request on text within a passed filename."""
#     client = language_v1.LanguageServiceClient.from_service_account_json("../../../Others/Moodivity-fb12d231d9c7.json")

#     document = language_v1.Document(content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
#     annotations = client.analyze_sentiment(request={'document': document})

#     magnitude = annotations.document_sentiment.magnitude
    
#     return magnitude

# print(analyze(content))