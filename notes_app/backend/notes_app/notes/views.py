from ast import FormattedValue
from asyncio.format_helpers import _format_callback_source
from locale import format_string
from urllib import request
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpRequest
from django.contrib.auth import get_user_model
from django.contrib.auth.views import LoginView
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.views.generic import CreateView, ListView, DeleteView, FormView, UpdateView
from django.db.models import Q
from django.urls import reverse_lazy
from typing import *
from django.http import HttpResponseNotAllowed
from .forms import AddNoteForm, AddTagForm, UpdateUserForm
from .models import *


AUTH_USER = get_user_model()


class CreateUserView(FormView):
    form_class = UserCreationForm
    template_name: str = 'users/signup.html'

    def form_valid(self, form) -> HttpResponse:
        form.save()
        return redirect('notes:notes')
    
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs: Any):
        if request.user.is_authenticated:
            return redirect('notes:notes')
        
        return super().dispatch(request, *args, **kwargs)
    

class UserLoginView(LoginView):
    template_name: str = 'users/login.html'
    success_url: Optional[str] =  reverse_lazy('notes:notes')
    next_page = reverse_lazy('notes:notes')
    redirect_authenticated_user: bool = True


def logout_user(request: HttpResponse):
    logout(request)
    return HttpResponse('You logged out.')


class NoteListView(ListView, LoginRequiredMixin):
    model = Note
    template_name: str = 'dashboard/notes.html'
    paginate_by: int = 20
    context_object_name: Optional[str] = 'notes'
    
    def get_queryset(self):
        tags = self.request.GET.getlist('tags')
        search_keywords = self.request.GET.get('search')
        notes = Note.objects.filter(user=self.request.user)
        if tags:
            notes &= Note.objects.filter(tags__name__in=tags)
        if search_keywords:
            print(search_keywords)
            notes &= Note.objects.filter(Q(tags__name__icontains=search_keywords) 
                                  | Q(title__icontains=search_keywords) 
                                  | Q(body__icontains=search_keywords))
        return notes


    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        data = super().get_context_data(**kwargs)
        data['selected_tags'] = self.request.GET.getlist('tags')
        data['search'] = self.request.GET.get('search')
        return data

@login_required
def add_note(request: HttpRequest, note_id=None):
    if request.method == 'POST':
        if note_id:
            note = get_object_or_404(Note, note_id=note_id, user=request.user)
        form = AddNoteForm(request.POST, instance=note)
        if form.is_valid():
            form.save()
            return redirect('notes:notes')
    return HttpResponseNotAllowed(['POST'])


@login_required
def delete_note(request: HttpRequest, note_id):
    note = get_object_or_404(Note, pk=note_id, user=request.user)
    note.delete()
    return redirect('notes:notes')


class TagListView(ListView, LoginRequiredMixin):
    model = Tag
    template_name: str = 'dashboard/tags.html'
    context_object_name: Optional[str] = 'tags'
    
    def get_queryset(self):
        return Tag.objects.filter(user=self.request.user)


@login_required
def delete_tag(request: HttpRequest, tag_id):
    tag = get_object_or_404(Tag, pk=tag_id, user=request.user)
    tag.delete()
    return redirect('notes:tags')


class AddTagView(FormView):
    model = Tag
    fields = ('name', )
    form_class = AddTagForm
    
    def form_valid(self, form) -> HttpResponse:
        tag = form.save(commit=False)
        tag.user = self.request.user
        tag.save()
        return redirect('notes:tags')

    
#------------------------- wHIH IS BETTER ?-------------------
class UserProfileView(FormView, LoginRequiredMixin):
    template_name = 'dashboard/profile.html'
    form_class = UpdateUserForm
    success_url = reverse_lazy('notes:profile')

    def get_form_kwargs(self) -> Dict[str, Any]:
        kwrags = super().get_form_kwargs()
        kwrags.update({'instance': self.request.user})
        return kwrags
    
    def form_valid(self, form) -> HttpResponse:
        form.save()
        return render(self.request,'dashboard/profile.html')
    

@login_required
def update_profile(request: HttpRequest):
    context = None
    if request.method == 'POST':
        form = UpdateUserForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            
        context =  {
            'status': 'updated'
        }
    return render(request, 'dashboard/profile.html', context)

class PasswordChangeView(FormView):
    form_class = PasswordChangeForm
    template_name: str = 'dashboard/profile.html'
    success_url: Optional[str] = 'dashboard/profile.html'
    
    