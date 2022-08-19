from email.mime import base
from rest_framework.routers import DefaultRouter

from .views import NoteViewset, TagViewset

router = DefaultRouter()
router.register(r'notes',NoteViewset, basename='notes')
router.register(r'tags', TagViewset, basename='tags')

