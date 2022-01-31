from django.urls import path
from rest_framework import routers, urlpatterns
from core.views import AccountViewSet, ClassesViewSet, ItemViewSet, SectionViewSet, UserViewSet, current_user, CreateUser, UserAPI, InstructViewSet

router = routers.DefaultRouter()

router.register('accounts', AccountViewSet,'accounts')
router.register('instructors', InstructViewSet,'instructors')
router.register('items', ItemViewSet,'items')
router.register('classes', ClassesViewSet,'classes')
router.register('sections', SectionViewSet,'sections')
router.register('users', UserViewSet,'users')

urlpatterns = [
    path('currentuser/', current_user),
    path('createuser/', CreateUser.as_view()),
    path('userapi/<int:pk>', UserAPI.as_view()),
]

urlpatterns += router.urls