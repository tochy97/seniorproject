from re import T
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.forms import IntegerField
from django_mysql.models import ListTextField

class Item(models.Model):
    name = models.CharField(max_length=50)
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    total = models.PositiveSmallIntegerField(default=1)
    out = models.PositiveSmallIntegerField(default=0)
    available = models.PositiveSmallIntegerField(default=1)
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
    sections = ListTextField(base_field=models.IntegerField(), size=100)
    classes = ListTextField(base_field=models.IntegerField(), size=100,)

class Classes(models.Model):
    id = models.AutoField(primary_key=True)
    instructor = models.PositiveSmallIntegerField()
    sections = ListTextField(base_field=models.PositiveSmallIntegerField(), size=100, max_length=(1000), blank=True, null=True)
    number = models.PositiveSmallIntegerField()

    