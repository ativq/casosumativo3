from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.text import slugify
from ckeditor.fields import RichTextField

# Create your models here.

class producto(models.Model):
    nombre = models.CharField(max_length=400)
    precio = models.FloatField(max_length=10, default=0.0)
    imagen = models.ImageField(null=True, blank=True, upload_to="principal/",default="principal/producto-default.png")
    descripcion = models.CharField(max_length=400)  
    slug = models.SlugField(unique=True, null=True, max_length=400)
    hora_de_creacion = models.DateTimeField(auto_now_add=True)

    def get_absolute_url(self):
        return reverse('producto-detail', kwargs={'pk':self.pk, 'slug':self.slug})
    
    def save(self, *args, **kwargs):
        value = self.nombre
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return '%s - %s' % (self.nombre, self.hora_de_creacion)
