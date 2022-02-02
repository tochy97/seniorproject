from django.urls import path
from rest_framework import routers, urlpatterns
from core.views import AccountViewSet, ClassesDetails, ClassesViewSet, ItemViewSet, UserViewSet, current_user, CreateUser, UserAPI, InstructViewSet, InstructDetails

router = routers.DefaultRouter()

router.register('accounts', AccountViewSet,'accounts')
router.register('instructors', InstructViewSet,'instructors')
router.register('items', ItemViewSet,'items')
router.register('classes', ClassesViewSet,'classes')
router.register('users', UserViewSet,'users')

urlpatterns = [
    path('currentuser/', current_user),
    path('instructs/<int:pk>/', InstructDetails.as_view()),
    path('class/<int:pk>/', ClassesDetails.as_view()),
    path('createuser/', CreateUser.as_view()),
    path('userapi/<int:pk>', UserAPI.as_view()),
]

urlpatterns += router.urls