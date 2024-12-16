from django.shortcuts import render, redirect
from .models import Project
# Create your views here.

def index(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            pass
        return render(request, 'main/views/index.html')
    return redirect('scrape')


def scrape(request):
    return render(request, 'main/views/scrape.html')
