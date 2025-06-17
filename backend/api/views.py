from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, FolderSerializer, EntrySerializer
from .models import Entry, Folder
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class FolderListCreateView(generics.ListCreateAPIView):
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Folder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)


class FolderDeleteView(generics.DestroyAPIView):
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Folder.objects.filter(user=self.request.user)


class EntryListCreateView(generics.ListCreateAPIView):
    serializer_class = EntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Entry.objects.filter(folder__user=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            folder = serializer.validated_data.get('folder')
            if folder.user != self.request.user:
                raise PermissionDenied("You cannot add entry to this folder")
            serializer.save()
        else:
            print(serializer.errors)


class EntryDeleteView(generics.DestroyAPIView):
    serializer_class = EntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Entry.objects.filter(folder__user=self.request.user)