"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from myapp.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',index,name='homie'),
    path('login/',logins,name='login'),
    path('home/',home,name='home'),
    path('logout/',logouti,name='logout'),
    path('events/diwali/',diwali,name='diwali'),
    path('events/christmas/',christmas,name='christmas'),
    path('events/birthday/',birthday,name='birthday'),
    path('dota2/',dota2,name='dota2'),
    path('rush/',rush,name='rush'),
    path('minionmaster/',minionmaster,name='minionmaster'),
    path('stickfight/',stickfight,name='stickfight'),
    path('contact/',contact,name='contact'),
    path('services/',services,name='services'),
    path('about/',about,name='about'),
    path('signup/',signup,name='signup'),
]
