from django.urls import path

from .views import  update_profile,AddTagView,UserProfileView ,CreateUserView, NoteListView, TagListView, UserLoginView, delete_tag, logout_user
from django.shortcuts import render, redirect

def dashboard(request):
    if not request.user.is_authenticated:
        return redirect('notes:login')
    return render(request, 'dashboard/notes.html')


app_name = 'notes'
urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('login', UserLoginView.as_view(), name='login'),
    path('logout', logout_user, name='logout'),
    path('profile', UserProfileView.as_view(), name='profile' ),
    path('notes/', NoteListView.as_view(), name='notes'),
    path('tags/', TagListView.as_view(), name='tags'),
    path('tags/add/', AddTagView.as_view(), name='tags-add'),
    path('tags/delete/<int:tag_id>/', delete_tag, name='tags-delete'),
]