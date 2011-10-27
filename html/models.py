from django.contrib.auth.models import User
class Url(models.Model):
    src = models.CharField(max_length=255, primary_key=True)
    redirect  = models.CharField(max_length=255)
    alerts = models.Int(default = 0)

class Malware(models.Model):
    domain = models.CharField(max_length=255, primary_key=True)