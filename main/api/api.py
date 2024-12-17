from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Project
from .serializers import ProjectSerializer
from .scrape import Automate

@api_view(['POST'])
def create_project(request):
    if request.user.is_authenticated:
        data = request.data
        data['project_owner'] = request.user

        new_project = ProjectSerializer(data=data)

        if new_project.is_valid():
            new_project.save()
            print(new_project.data)
            return Response({ 'result' : new_project.data })
    return Response({ 'message' : 'Please login' })


@api_view(['DELETE'])
def delete_project(request, id=False):
    print(id)
    if request.user.is_authenticated:
        if id:
            detele_proj = Project.objects.get(project_id = id)
            detele_proj.delete()
            return Response({ 'message' : 'Deleted Successfully' })
        return Response({ 'message' : 'Invalid ID' })
    return Response({ 'message' : 'Please login' })


@api_view(['POST'])
def test_step(request):
    data = request.data
    print(data)
    website = Automate('https://brian578.pythonanywhere.com/sign-in/')
    input_tags = website.tag_and_class(tag=data['tag_type'], class_=data['tag_name'])
    print(input_tags.count())
    website.stop()
    return Response({'result' : 'Success'})