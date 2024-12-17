from django.urls import path
from . import views
from .api import api

urlpatterns = [
    path('', views.index, name='index'),
    path('automate/<str:id>', views.scrape, name='scrape'),

    #API
    path('api/project', api.create_project),
    path('api/project/<str:id>', api.delete_project),
    path('api/test', api.test_step)
]