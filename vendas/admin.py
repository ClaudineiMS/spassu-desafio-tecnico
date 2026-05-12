from django.contrib import admin
from .models import Cliente, Produto, Vendedor
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
    
@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'codigo',
        'descricao',
        'valor_unitario',
        'percentual_comissao',
    ]
    search_fields = [
        'codigo',
        'descricao',
    ]
    ordering = [
        'descricao',
    ]