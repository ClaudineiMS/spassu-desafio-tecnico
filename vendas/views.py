from rest_framework import viewsets

from .models import Cliente, Produto, Venda, Vendedor
from .serializers import ClienteSerializer, ProdutoSerializer, VendaSerializer, VendedorSerializer


class VendedorViewSet(viewsets.ModelViewSet):
    queryset = Vendedor.objects.all().order_by('nome')
    serializer_class = VendedorSerializer
    
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all().order_by('nome')
    serializer_class = ClienteSerializer
    
class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all().order_by('descricao')
    serializer_class = ProdutoSerializer
    
class VendaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.select_related(
        'cliente',
        'vendedor',
    ).prefetch_related(
        'itens__produto',
    ).order_by('-data_hora')
    serializer_class = VendaSerializer