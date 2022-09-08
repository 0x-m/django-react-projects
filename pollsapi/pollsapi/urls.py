
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('polls.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

]
