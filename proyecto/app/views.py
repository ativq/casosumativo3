from django.shortcuts import render, redirect
from .models import *
from .forms import CustomUserCreationForm
from django.contrib.auth import authenticate, login

# Create your views here.

def index(request):
    context={}
    return render(request, "app/index.html", context)

def descripcion(request):
    context={}
    return render(request, "app/descripcion.html", context)

def principal(request):
    principal = producto.objects.all()
    context={'principal':principal}
    return render(request, "app/principal.html", context)

def descripcion1(request):
    context={}
    return render(request, "app/descripcion1.html", context)

def login_view(request):
    context={}
    return render(request, "app/login.html", context)


def registro(request):
    data = {
        'form': CustomUserCreationForm()
    }
    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(username=formulario.cleaned_data["username"], password=formulario.cleaned_data["password1"])
            print(user)
            login(request, user)
            return redirect(to="principal")
        data["form"] = formulario
    return render(request, "registration/registro.html", data)

def descripcion2(request):
    context={}
    return render(request, "app/descripcion2.html", context)

