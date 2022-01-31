
   
from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AccountSerializer, ItemSerializer, UserSerializer, UserSerializerWithToken, InstructSerializer, ClassesSerializer, SectionSerializer
from .models import Account, Item, Instruct, Classes, Section

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = ItemSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = AccountSerializer

class ClassesViewSet(viewsets.ModelViewSet):
    queryset = Classes.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = ClassesSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = SectionSerializer

class InstructViewSet(viewsets.ModelViewSet):
    queryset = Instruct.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = InstructSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

@api_view(['GET'])
def current_user(request):
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class CreateUser(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserAPI(APIView):

    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)