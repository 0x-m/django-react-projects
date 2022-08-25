from dataclasses import field
from pyexpat import model
from notes.models import *
from rest_framework import serializers
from rest_framework import relations

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class NoteSerializer(serializers.ModelSerializer):
    tags_name = relations.StringRelatedField(many=True,source='tags', read_only=True)
    class Meta:
        model = Note
        fields = ('id','title', 'body', 'date_created', 'due_date', 'tags', 'tags_name')
        extra_kwargs = {
            'date_created': {'read_only': True}
        }
    

