from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Project(models.Model):
    project_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    project_url = models.TextField()
    project_owner = models.ForeignKey(User, on_delete=models.CASCADE)
    project_type = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.project_owner.username}: {self.project_url}'
