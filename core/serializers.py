from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
# from rest_framework_simplejwt.settings import api_settings
from rest_framework_jwt.settings import api_settings
from django.utils.translation import ugettext_lazy as _

from .models import Account, Item, Classes, TimeStamp

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        extra_kwargs = {'items': {'required': False}}

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    users = AccountSerializer(many=True, read_only=True)

    class Meta:
        model = Item
        fields = '__all__'
        extra_kwargs = {'users': {'required': False}}

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class TimeStampSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimeStamp
        fields = '__all__'

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')