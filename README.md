# Moodivity

### About the application

Everybody struggles with the stresses of every day life, and for the most part it is your mental health that is sacrificed for your productivity.

This quickly leads individuals down a vicious cycle of being unproductive and overwhelmed because of their deteriorating mental health and wellbeing.

Moodivity is a web application that improves productivity for users while guiding users to be more in tune with their mental health, as well as aware of their own mental well-being.

Users can create a profile, setting daily goals for themselves, and different activities linked to the work they will be doing. They can then start their daily work, timing themselves as they do so. Once they are finished for the day, they are prompted to record an audio log to reflect on the work done in the day.

These logs are transcribed and analyzed using powerful Machine Learning models, and saved to the database so that users can reflect later on days they did better, or worse, and how their sentiment reflected that.


### Tech Stack

***Frontend***
  * React
    * UI framework the application was written in
  * JavaScript
    * Language the frontend was written in
  * Redux
    * Library used for state management in React
  * Redux-Sagas
    * Library used for asynchronous requests and complex state management
    
__Backend and Frontend connected through REST API___
    
***Backend***
  * Django
    * Backend framework the application was written in
  * Python
    * Language the backend was written in
  * Django Rest Framework
    * built in library to connect backend to frontend
  * Google Cloud API
    * Speech To Text API for audio transcription
    * NLP Sentiment Analysis for mood analysis of transcription
    * Google Cloud Storage to store audio files recorded by users

***Database***
  * PostgreSQL
    * used for data storage of Users, Logs, Profiles, etc.
    
### How it Works

A user will record an audio log which is posted to the Django Server through a connected REST API. The posted audio file will be stored in the Google Cloud Storage for secure storage, read from storage and converted to text using Google's Speech to Text API, and then analyzed using Google's NLP sentiment analysis API.

Once the log is analyzed, the logs are displayed on the users dashboard, allowing them to reflect on their sentiment, and how it relates to their set goal.
