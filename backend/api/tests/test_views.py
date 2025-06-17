from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from api.models import Folder, Entry
from rest_framework_simplejwt.tokens import RefreshToken


class ViewsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="tester", password="strongpass")
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)
        self.auth_header = {"HTTP_AUTHORIZATION": f"Bearer {self.token}"}

        self.folder = Folder.objects.create(user=self.user, name="Test Folder")

    def test_create_folder(self):
        url = reverse("folder-list-create")
        data = {"name": "New Folder"}
        response = self.client.post(url, data, **self.auth_header)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "New Folder")

    def test_get_folders(self):
        url = reverse("folder-list-create")
        response = self.client.get(url, **self.auth_header)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_delete_folder(self):
        url = reverse("folder-delete", args=[self.folder.id])
        response = self.client.delete(url, **self.auth_header)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Folder.objects.filter(id=self.folder.id).exists())

    def test_create_entry(self):
        url = reverse("entry-list-create")
        data = {
            "folder": self.folder.id,
            "title": "Gmail",
            "username": "email_user",
            "password": "email_pass",
            "notes": "Mail account",
        }
        response = self.client.post(url, data, **self.auth_header)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "Gmail")

    def test_get_entries(self):
        Entry.objects.create(
            folder=self.folder,
            title="Test Entry",
            username="login",
            password="secret",
            notes=""
        )
        url = reverse("entry-list-create")
        response = self.client.get(url, **self.auth_header)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_delete_entry(self):
        entry = Entry.objects.create(
            folder=self.folder,
            title="Reddit",
            username="reddit_user",
            password="pass123",
            notes="Reddit login"
        )
        url = reverse("entry-delete", args=[entry.id])
        response = self.client.delete(url, **self.auth_header)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Entry.objects.filter(id=entry.id).exists())
