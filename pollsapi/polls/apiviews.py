
from lib2to3.pgen2.pgen import generate_grammar
from sqlite3 import IntegrityError
from rest_framework import viewsets
from .models import Poll, Choice, Vote
from .serializers import ChoiceSerializer, PollSerializer, UserSerializer, VoteSerializer
from rest_framework import status
from rest_framework.request import Request
from rest_framework import permissions
from .permissions import IsOwner, IsOwnerOrAdmin, IsPollOwnerOrAdmin, IsVoteOwnerOrAdmin

class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        elif self.action in ['update', 'parial_update', 'destroy']:
            return [IsOwnerOrAdmin()]
        
        return super().get_permissions()


    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
        
    
from rest_framework import exceptions
from django.db import IntegrityError

class ChoiceViewset(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    
    def get_queryset(self):
        return Choice.objects.filter(poll_id=self.kwargs.get('poll_pk'))
        
    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy', 'parial_update']:
            return [IsPollOwnerOrAdmin()]
        return super().get_permissions()
    
    def perform_create(self, serializer):
        try:
            Choice.objects.get_or_create(
                poll_id=self.kwargs.get('poll_pk'), 
                choice_text=serializer.validated_data.get('choice_text') 
            )
        except Exception as e:
            raise exceptions.NotFound('the poll was not found')

            
class VoteViewset(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        poll_id = self.kwargs.get('poll_pk')
        choice_id = self.kwargs.get('choice_pk')
        votes = Vote.objects.filter(poll__id=poll_id)
        if choice_id:
            print
            votes = votes.filter(choice__id=choice_id)
        return votes
    
    
    # def get_permissions(self):
    #     if self.action in ['update', 'partial_update', 'list']:
    #         return [permissions.IsAdminUser()]
    #     elif self.action == 'destroy':
    #         return [IsVoteOwnerOrAdmin()]
    #     return super().get_permissions()
    
    #polls/{poll_id}/choices/{choice_id}/votes/ 
    def perform_create(self, serializer):
        poll_pk = self.kwargs.get('poll_pk')
        choice_pk = self.kwargs.get('choice_pk')
        
        choice_belongs_to_poll = Choice.objects.filter(poll_id=poll_pk, id=choice_pk).exists()
        if not choice_belongs_to_poll:
            raise exceptions.APIException(f'The choice with ``id={choice_pk}`` does not belong to the Poll with ``id={poll_pk}``')
        try:
            Vote.objects.get_or_create(poll_id=poll_pk, choice_id=choice_pk, voted_by=self.request.user)
        except:
            raise exceptions.APIException('You already have voted for this poll.')
       
 
# class UserCreate(generics.CreateAPIView):
#     authentication_classes = []
#     permission_classes = []
#     serializer_class = UserSerializer
    
    
# class LoginView(APIView):
#     permission_classes = []
    
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.date.get('password')
#         user = authenticate(username=username, password=password)
#         if user:
#             return Response({"token": user.auth_token.key})
#         else:
#             return Response({"error": "Wrong Credentials"}, status=HTTP_400_BAD_REQUEST)
        
    