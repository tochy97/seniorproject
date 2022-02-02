
   
from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .serializers import AccountSerializer, ItemSerializer, UserSerializer, UserSerializerWithToken, InstructSerializer, ClassesSerializer
from .models import Account, Item, Instruct, Classes

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

class ClassesDetails(APIView):

    def get_object(self, pk):
        try:
            return Classes.objects.get(pk=pk)
        except Classes.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ClassesSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ClassesSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ClassesViewSet(viewsets.ModelViewSet):
    queryset = Classes.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = ClassesSerializer

class InstructDetails(APIView):

    def get_object(self, pk):
        try:
            return Instruct.objects.get(pk=pk)
        except Instruct.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = InstructSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = InstructSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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