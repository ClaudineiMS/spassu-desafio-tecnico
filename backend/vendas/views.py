from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from vendas.services.comissoes import listar_comissoes_por_periodo

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
    

class ComissaoViewSet(viewsets.ViewSet):
    def list(self, request):
        data_inicio = request.query_params.get('data_inicio')
        data_fim = request.query_params.get('data_fim')

        if not data_inicio or not data_fim:
            return Response(
                {
                    'detail': (
                        'Informe os parâmetros data_inicio e data_fim '
                        'no formato YYYY-MM-DD.'
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        resultado = listar_comissoes_por_periodo(
            data_inicio=data_inicio,
            data_fim=data_fim,
        )

        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(
            resultado['vendedores'],
            request,
            view=self,
        )

        if page is not None:
            response = paginator.get_paginated_response(page)
            response.data['data_inicio'] = data_inicio
            response.data['data_fim'] = data_fim
            response.data['total_geral'] = resultado['total_geral']

            return response

        return Response({
            'data_inicio': data_inicio,
            'data_fim': data_fim,
            'vendedores': resultado['vendedores'],
            'total_geral': resultado['total_geral'],
        })