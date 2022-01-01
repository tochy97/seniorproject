from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    instructor = models.OneToOneField(User, on_delete=models.CASCADE, related_name="instructor")
    section = models.PositiveSmallIntegerField()
    team = models.CharField(max_length=50)