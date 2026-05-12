from django.contrib import admin
from .models import Cliente, Vendedor
@admin.register(Vendedor)
class VendedorAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'nome',
        'email',
        'telefone',
    ]
    search_fields = [
        'nome',
        'email',
        'telefone',
    ]
    ordering = [
        'nome',
    ]
    
@admin.register(Cliente)
class VendedorAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'nome',
        'email',
        'telefone',
    ]
    search_fields = [
        'nome',
        'email',
        'telefone',
    ]
    ordering = [
        'nome',
    ]