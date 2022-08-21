from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

AUTH_USER = get_user_model()

class Tag(models.Model):
    user = models.ForeignKey(to=User, related_name='tags', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True, db_index=True)
    class Meta:
        unique_together = ('user', 'name')

    
    def __str__(self) -> str:
        return self.name
    
class Note(models.Model):
    user = models.ForeignKey(to=User, related_name='notes', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    body = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(to=Tag, related_name='notes')
    due_date = models.DateTimeField(null=True, blank=True)

    def __str__(self) -> str:
        return  self.title
    




                                  