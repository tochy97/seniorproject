from django.urls import path
from rest_framework import routers, urlpatterns
from core.views import UserViewSet, current_user, CreateUser

router = routers.DefaultRouter()

router.register('users', UserViewSet,'users')

urlpatterns = [
    path('currentuser/', current_user),
    path('createuser/', CreateUser.as_view()),
]

urlpatterns += router.urls