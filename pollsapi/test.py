from decimal import DefaultContext
from email.mime import base
from polls.apiviews import PollViewSet
from rest_framework.routers import DefaultRouter
from pprint import pprint


router = DefaultRouter()
router.register(r'polls', PollViewSet, basename='polls')

pprint(router.urls)