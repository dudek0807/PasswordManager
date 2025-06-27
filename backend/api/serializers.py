from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Folder, Entry

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ['id', 'name', 'user']
        read_only_fields = ["user"]


class EntrySerializer(serializers.ModelSerializer):
    folder_name = serializers.CharField(source='folder.name', read_only=True)
    class Meta:
        model = Entry
        fields = ['id', 'folder', 'folder_name', 'username', 'password', 'url', 'created_at', 'updated_at']