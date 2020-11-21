from django.contrib.postgres.fields import ArrayField
from django.db import models

class UserLogs(models.Model):
    mood = models.CharField(max_length=200, blank=True, default="NULL")
    date = models.CharField(max_length=200, blank=True, default="NULL")
    log = models.CharField(max_length=10000, blank=True, default="NULL")
    analysis = models.CharField(max_length=10000, blank=True, default="NULL")


# {
#     "mood" : "happy",
#     "date" : "2001-10-10",
#     "log" : "this is a log",
#     "analysis" : "this is an analysis"
# }