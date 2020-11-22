from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    name = models.CharField(max_length=100, null=True)
    activities = ArrayField(models.CharField(max_length=200, blank=True, default="NULL"),null=True)
    startTime = models.CharField(max_length=100,null=True)
    endTime = models.CharField(max_length=100,null=True)
    prodGoal = models.FloatField(null=True)
    owner = models.ForeignKey(
        User,
        related_name="profile",
        on_delete=models.CASCADE,
        null=True
    )

# {
#     "name" : "ryan",
#     "activities" : ["1","2","3"],
#     "startTime" : "hello",
#     "endTime" : "hello",
#     "prodGoal" : 1
# }