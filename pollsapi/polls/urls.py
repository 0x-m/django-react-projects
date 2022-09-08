from base64 import urlsafe_b64decode
from cgitb import lookup
from email.mime import base
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .serializers import ChoiceSerializer
from .apiviews import ChoiceViewset, PollViewSet, VoteViewset
from rest_framework_nested import routers




router = DefaultRouter()
router.register(r'polls', PollViewSet, basename='polls')
choice_router = routers.NestedSimpleRouter(router, r'polls', lookup='poll')
choice_router.register(r'choices', ChoiceViewset, basename='poll-choices')
# choice_router.register(r'votes', VoteViewset, basename='poll-votes')
vote_nested_router = routers.NestedSimpleRouter(choice_router, r'choices', lookup='choice')
vote_nested_router.register(r'votes', VoteViewset, basename='poll-choice-votes')
rr = DefaultRouter()
rr.register(r'choices', ChoiceViewset, basename='choices')
urlpatterns = [
    # path('login/', LoginView.as_view(), name='login'),
    # path('choices/', ChoiceList.as_view(), name='choice_list'),
    # path('vote/', CreateVote.as_view(), name='create_vote'),
    # path('polls/<int:pk>/choices/', ChoiceList.as_view(), name='choice_list'),
    path('', include(router.urls)),
    path('', include(choice_router.urls)),
    path('', include(vote_nested_router.urls)),
    path('', include(rr.urls)),
    # path('polls/<int:pk>/choices/<int:choice_pk>/vote/', CreateVote.as_view(), name='create_vote'),
    # path("users/", UserCreate.as_view(), name='user_create'),
    
]

