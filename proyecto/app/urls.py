from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", views.index, name="index"),
    path("descripcion", views.descripcion, name="descripcion"),
    path("descripcion1", views.descripcion1, name="descripcion1"),
    path("descripcion2", views.descripcion2, name="descripcion2"),
    path("principal", views.principal, name="principal"),
    path("login", views.login_view, name="login"),
    path("registro", views.registro, name="registro"),
]+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)