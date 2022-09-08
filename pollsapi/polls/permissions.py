from http.client import ImproperConnectionState
from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user
    
class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user or request.user.is_staff
    
    def has_permission(self, request, view):
        return True
    
class IsPollOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.poll.created_by == request.user or request.user.is_staff

    

class IsVoteOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or request.user == obj.voted_by
    

class UserDoesNotVote(BasePermission):
    def has_object_permission(self, request, view, obj):
        return super().has_object_permission(request, view, obj)