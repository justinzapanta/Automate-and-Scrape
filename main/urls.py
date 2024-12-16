from django.urls import path
from . import views
from .api import api

urlpatterns = [
    path('', views.index, name='index'),
    path('scrape/', views.scrape, name='scrape'),

    #API
    path('api/project', api.create_project)
]