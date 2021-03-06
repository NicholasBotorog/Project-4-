from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  email = models.CharField(max_length=70, unique=True)
  first_name= models.CharField(max_length=50)
  last_name= models.CharField(max_length=50)
  profile_image = models.CharField(max_length=300, blank=True)
  bio = models.CharField(max_length=300, blank=True)
  website = models.CharField(max_length = 300, blank=True)
  