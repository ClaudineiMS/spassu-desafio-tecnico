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
    
@admin.register(RegraComissao)
class RegraComissaoAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'get_dia_semana',
        'percentual_minimo',
        'percentual_maximo',
    ]
    list_filter = [
        'dia_semana',
    ]
    ordering = [
        'dia_semana',
    ]

    def get_dia_semana(self, obj):
        return obj.get_dia_semana_display()

    get_dia_semana.short_description = 'Dia da semana'