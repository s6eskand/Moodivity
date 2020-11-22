from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import User

class UserLogs(models.Model):
    mood = models.CharField(max_length=500, blank=True, default="NULL")
    date = models.CharField(max_length=500, blank=True, default="NULL")
    log = models.CharField(max_length=10000, blank=True, default="NULL")
    analysis = models.CharField(max_length=10000, blank=True, default="NULL")
    goalStatus = models.CharField(max_length=500, blank=True, default="NULL")
    owner = models.ForeignKey(
        User,
        related_name="logs",
        on_delete=models.CASCADE,
        null=True
    )

# {
#     "mood" : "happy",
#     "date" : "2001-10-10",
#     "log" : "this is a log",
#     "analysis" : "this is an analysis"
# }