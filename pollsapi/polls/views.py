from django.shortcuts import render, get_object_or_404
from django.http import HttpRequest, HttpResponse, JsonResponse

from pollsapi.polls.models import Poll

def polls_list(requst: HttpRequest) -> JsonResponse:
    MAX_OBJECT = 20
    polls = Poll.objects.all()[:MAX_OBJECT]
    data = {"result":list(polls.values("question", "created_by__username", "pub_date"))}
    return JsonResponse(data)


def polls_detail(request: HttpRequest, pk):
    poll = get_object_or_404(Poll, pk=pk)
    data = {
        "results": {
            "question": poll.question,
            "created_by": poll.craeted_by,
            "pub_date": poll.pub_date
        }
    }
    
    return JsonResponse(data)

    
