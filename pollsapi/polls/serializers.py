import imp
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.relations import StringRelatedField, PrimaryKeyRelatedField
from .models import Poll, Choice, Vote

class VoteSerializer(serializers.ModelSerializer):
    voted_by = StringRelatedField(read_only=True)
    class Meta:
        model = Vote
        fields = ('id','voted_by')
        extra_kwargs = {
            'voted_by': {'read_only': True},
        }
       

class ChoiceSerializer(serializers.ModelSerializer):
    # votes = VoteSerializer(many=True, required=False)
    class Meta:
        model = Choice
        fields = ('id', 'choice_text', 'poll')
        extra_kwargs = {
            'id' : {'read_only': True},
            'poll': {'read_only': True}
        }


class PollSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True, required=False)
    created_by = StringRelatedField(read_only=True)
    class Meta:
        model = Poll
        fields = '__all__'
    
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_keywords = {'password': {'write_only: True'}}
        
    
    def create(self, validated_data):
        user = User(email=validated_data['email'],
                    username=validated_data['username'],
                    )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user

