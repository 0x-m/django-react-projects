from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import generics, permissions, viewsets

from .models import Post
from .serializers import PostSerializer, UserSerailizer
from .permissions import IsAuthorOrReadOnly


class PostViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerailizer
    permission_classes = (permissions.IsAdminUser,)

