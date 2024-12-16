from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Project
from .serializers import ProjectSerializer

@api_view(['POST'])
def create_project(request):
    new_project = ProjectSerializer(data=request.data)

    if new_project.is_valid():
        new_project.save()
        return Response({ 'message' : 'Success' })
    return Response({ 'message' : 'Something Wrong' })