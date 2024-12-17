from django.shortcuts import render, redirect
from .models import Project
from .api.scrape import Automate

# Create your views here.

def index(request):
    # if request.user.is_authenticated:
    #     if request.method == 'POST':
    #         
    projects = Project.objects.filter(project_owner_email = request.user.username)
    return render(request, 'main/views/index.html', { 'projects' : projects})
    return redirect('scrape')


def scrape(request, id):
    try:
        if request.user.is_authenticated:
            project = Project.objects.get(
                project_id = id,
                project_owner_email = request.user.username
            )

            return render(request, 'main/views/automate.html', {
                'project' : project,
                'url' : project.project_url
                })
    except:
        return redirect('index')
    return redirect('index')