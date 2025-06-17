from django.urls import path
from .views import (
    FolderListCreateView,
    FolderDeleteView,
    EntryListCreateView,
    EntryDeleteView,
)

urlpatterns = [
    path('folders/', FolderListCreateView.as_view(), name='folder-list-create'),
    path('folders/<int:pk>/delete/', FolderDeleteView.as_view(), name='folder-delete'),

    path('entries/', EntryListCreateView.as_view(), name='entry-list-create'),
    path('entries/<int:pk>/delete/', EntryDeleteView.as_view(), name='entry-delete'),
]