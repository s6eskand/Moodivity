from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.


class UserProfile(models.Model):
    activities = ArrayField(models.CharField(max_length=200), blank=True)
    startTime = models.CharField(max_length=100)
    endTime = models.CharField(max_length=100)
    prodGoal = models.CharField(max_length=100)


# {
#     "activities" : "hello",
#     "startTime" : "hello",
#     "endTime" : "hello",
#     "prodGoal" : "hello",
# }