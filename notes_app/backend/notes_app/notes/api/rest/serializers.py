from dataclasses import fields
from pyexpat import model
from notes.models import *
from rest_framework import serializers

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('title', 'body', 'date_created', 'due_date', 'tags')
        extra_kwargs = {
            'date_created': {'read_only': True}
        }


