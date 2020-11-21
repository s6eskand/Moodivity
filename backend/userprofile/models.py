from django.contrib.postgres.fields import ArrayField
from django.db import models

class UserProfile(models.Model):
    name = models.CharField(max_length=100, null=True)
    activities = ArrayField(models.CharField(max_length=200, blank=True, default="NULL"),null=True)
    startTime = models.CharField(max_length=100,null=True)
    endTime = models.CharField(max_length=100,null=True)
    prodGoal = models.CharField(max_length=100,null=True)
    moodList = ArrayField(models.CharField(max_length=200, blank=True, default="0"),null=True)
    moodDateList = ArrayField(models.CharField(max_length=200, blank=True, default="0"),null=True)


# {
#     "activities" : ["1","2","3"],
#     "startTime" : "hello",
#     "endTime" : "hello",
#     "prodGoal" : "hello",
#     "mood" : {
#         "mood" : "0.8",
#         "date" : "sept 10 2020"
#      }
# }