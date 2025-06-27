from django.db import models
from django.contrib.auth.models import User

class Folder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="folders")
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class Entry(models.Model):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name="entries")
    username = models.CharField(max_length=100, blank=True)
    password = models.CharField(max_length=256)
    url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
