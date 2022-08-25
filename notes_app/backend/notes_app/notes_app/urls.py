
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('notes.urls', namespace='notes')),
    path('api/v1/', include('notes.api.rest.urls')),
    path('api/v1/users/', include('dj_rest_auth.urls')),
    path('api/v1/users/registration/', include('dj_rest_auth.registration.urls')),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]
