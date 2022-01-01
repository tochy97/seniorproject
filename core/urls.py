from django.urls import path
from rest_framework import routers, urlpatterns
from core.views import AccountViewSet, UserViewSet, current_user, CreateUser, UserAPI

router = routers.DefaultRouter()

router.register('accounts', AccountViewSet,'accounts')
router.register('users', UserViewSet,'users')

urlpatterns = [
    path('currentuser/', current_user),
    path('createuser/', CreateUser.as_view()),
    path('userapi/<int:pk>', UserAPI.as_view()),
]

urlpatterns += router.urls