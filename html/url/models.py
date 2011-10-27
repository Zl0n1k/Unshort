from django.db import models

class Url(models.Model):
    src = models.CharField(max_length=255, primary_key=True)
    redirect  = models.CharField(max_length=255)
    alerts = models.IntegerField(default = 0)

class Malware(models.Model):
    domain = models.CharField(max_length=255, primary_key=True)