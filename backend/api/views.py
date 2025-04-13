# from django.contrib.auth.hashers import make_password
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from rest_framework import status
# from .models import User
# from .serializers import UserSerializer

# # Register function
# @api_view(['POST'])
# def register_user(request):
#     data = request.data
#     data['password'] = make_password(data['password'])  # Hash password before storing
#     serializer = UserSerializer(data=data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
