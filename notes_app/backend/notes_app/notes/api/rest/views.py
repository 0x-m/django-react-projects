from notes.models import *
from .serializers import NoteSerializer, TagSerializer
from rest_framework import viewsets
from rest_framework import permissions
from django_filters.rest_framework.backends import DjangoFilterBackend

from .permissions import IsOwner

class TagViewset(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    def get_queryset(self):
        return Tag.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    
class NoteViewset(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ('tags', )
    
    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


