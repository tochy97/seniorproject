from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django_mysql.models import ListCharField

class Item(models.Model):
    name = models.CharField(max_length=50)
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    total = models.IntegerField(default=1)
    out = models.IntegerField(default=0)
    available = models.IntegerField(default=1)
    ser_no = models.CharField(max_length=255)
    image = models.ImageField(null=False, blank=False)

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    instructor =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="instructor")
    section = models.PositiveSmallIntegerField()
    team = models.CharField(max_length=50)
    items = models.ManyToManyField(Item, related_name='users', blank=True)

class Instruct(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # sections = ArrayField(models.IntegerField(default=1))
    sections = models.CharField(max_length=10, blank=True, null=True)

# class Section(models.Model):
#     class_no = models.CharField(max_length=4)
#     section_no = models.IntegerField(primary_key=True)
#     students = models.ManyToManyField(User, related_name="sections", blank=True)
#     user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=False)
    