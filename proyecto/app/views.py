from django.shortcuts import render
from .models import *

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

def login(request):
    context={}
    return render(request, "app/login.html", context)

def registro(request):
    context={}
    return render(request, "app/registro.html", context)

def descripcion2(request):
    context={}
    return render(request, "app/descripcion2.html", context)
