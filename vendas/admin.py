from django.contrib import admin
from .models import Cliente, Produto, RegraComissao, Vendedor
@admin.register(Vendedor)
class VendedorAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'nome',
        'email',
        'telefone',
    ]
    list_editable = [
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
        'id',
    ]
    
@admin.register(Cliente)
class VendedorAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'nome',
        'email',
        'telefone',
    ]
    list_editable = [
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
        'id',
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
    list_editable = [
        'descricao',
        'valor_unitario',
        'percentual_comissao',
    ]
    search_fields = [
        'codigo',
        'descricao',
    ]
    ordering = [
        'id',
    ]
    
@admin.register(RegraComissao)
class RegraComissaoAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'dia_semana',
        'percentual_minimo',
        'percentual_maximo',
    ]
    list_display_links = [
        'id',
    ]
    list_editable = [
        'percentual_minimo',
        'percentual_maximo',
    ]
    list_filter = [
        'dia_semana',
    ]
    ordering = [
        'id',
    ]