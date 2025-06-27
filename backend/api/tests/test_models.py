from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Folder, Entry

class ModelsTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="securepass")
        self.folder = Folder.objects.create(user=self.user, name="Private")

    def test_create_user(self):
        self.assertEqual(self.user.username, "testuser")
        self.assertTrue(self.user.check_password("securepass"))

    def test_create_folder(self):
        self.assertEqual(self.folder.name, "Private")
        self.assertEqual(self.folder.user, self.user)

    def test_create_entry(self):
        entry = Entry.objects.create(
            folder=self.folder,
            username="fb_user",
            password="fb_pass",
        )
        self.assertEqual(entry.folder, self.folder)
        self.assertEqual(entry.username, "fb_user")
        self.assertEqual(entry.password, "fb_pass")