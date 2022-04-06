from django.urls import path
from rest_framework import routers, urlpatterns
from core.views import AccountViewSet, ClassesViewSet, ItemViewSet, UserViewSet, TimeStampViewSet, current_user, CreateUser, UserAPI, CreateItem

router = routers.DefaultRouter()

router.register('accounts', AccountViewSet,'accounts')
router.register('items', ItemViewSet,'items')
router.register('classes', ClassesViewSet,'classes')
router.register('users', UserViewSet,'users')
router.register('timestamps', TimeStampViewSet,'timestamps')

urlpatterns = [
    path('currentuser/', current_user),
    path('createuser/', CreateUser.as_view()),
    path('createitem/', CreateItem.as_view(), name='createitem'),
    path('userapi/<int:pk>/', UserAPI.as_view()),
]

urlpatterns += router.urls