from dataclasses import field, fields
from django import forms
from .models import Note, Tag
from django.contrib.auth.models import User



class AddTagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = ('name', )
    

class UpdateUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class AddNoteForm(forms.ModelForm):
    class Meta:
        model = Note
        fields = ('title', 'body', 'tags')