from re import T
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.forms import IntegerField
from django_mysql.models import ListTextField
from django.db.models import JSONField

def upload_to(instance, filename):
    return 'itemImages/{filename}'.format(filename=filename)

class Item(models.Model):
    name = models.CharField(max_length=50)
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    total = models.IntegerField(default=0)
    out = models.IntegerField(default=0)
    available = models.IntegerField(default=0)
    ser_no = models.CharField(max_length=255)

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    instructor =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="instructor", blank=True, null=True)
    myClass = models.IntegerField(blank=True, null=True)
    section = models.IntegerField(blank=True, null=True)
    team = models.CharField(max_length=50, blank=True, null=True)
    items = models.ManyToManyField(Item, related_name='users', blank=True)
    itemsCount = JSONField(blank=True, default = dict)

class Classes(models.Model):
    id = models.AutoField(primary_key=True)
    instructor = models.IntegerField()
    sections = ListTextField(base_field=models.IntegerField(), size=10, max_length=(10 * 5), blank=True, null=True)
    number = models.IntegerField()

