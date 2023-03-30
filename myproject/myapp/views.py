from django.shortcuts import render
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.models import User
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
# Create your views here.
def index(request):
    return render(request,'index.html')

def logins(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        whetheruser = authenticate(username = username, password = password)
        if whetheruser is not None :
            login(request,whetheruser)
            return HttpResponseRedirect(reverse('home'))
        # else:
            # return HttpResponse('you are not in the database go register yourself first')
    return render(request,'login.html')

@login_required
def home(request):
    return render(request,'home.html')

@login_required
def diwali(request):
    return HttpResponseRedirect(reverse('diwali'))

@login_required
def christmas(request):
    return render(request,'sec1.html')

@login_required
def birthday(request):
    return render(request,'sec3.html')

@login_required
def dota2(request):
    return render(request,'dota2.html')

@login_required
def rush(request):
    return render(request,'rush.html')

@login_required
def minionmaster(request):
    return render(request,'minionmaster.html')

@login_required
def stickfight(request):
    return render(request,'stickfight.html')

@login_required
def contact(request):
    return render(request,'contact.html')

@login_required
def services(request):
    return render(request,'services.html')

login_required
def about(request):
    return render(request,'about.html')

def logouti(request):
    logout(request)
    return render(request,'logout.html')

def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        email = request.POST['email']
        newuser = User.objects.create_user(username,email,password)
        newuser.save()
        return HttpResponseRedirect(reverse('login'))

    return render(request,'signup.html')