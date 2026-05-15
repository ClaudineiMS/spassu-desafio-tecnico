from drf_spectacular.utils import (
    OpenApiExample,
    extend_schema,
    extend_schema_view,
)


venda_schema = extend_schema_view(
    list=extend_schema(
        tags=['Vendas'],
        summary='Lista vendas',
        description=(
            'Retorna a lista paginada de vendas cadastradas no sistema. '
            'Cada venda possui cliente, vendedor, número da nota fiscal, '
            'data e hora da venda, valor total e seus respectivos itens.'
        ),
    ),
    create=extend_schema(
        tags=['Vendas'],
        summary='Cria venda',
        description=(
            'Cria uma nova venda com um ou mais itens. Cada item deve '
            'informar o produto vendido e a quantidade. O valor total da '
            'venda é calculado com base nos produtos e quantidades informadas.'
        ),
        examples=[
            OpenApiExample(
                name='Criação de venda',
                summary='Exemplo de criação de venda com itens',
                value={
                    'numero_nota_fiscal': 'NF-000001',
                    'data_hora': '2026-05-11T10:00:00Z',
                    'cliente': 1,
                    'vendedor': 1,
                    'itens': [
                        {
                            'produto': 1,
                            'quantidade': 2,
                        },
                        {
                            'produto': 2,
                            'quantidade': 1,
                        },
                    ],
                },
                request_only=True,
            ),
        ],
    ),
    retrieve=extend_schema(
        tags=['Vendas'],
        summary='Detalha venda',
        description=(
            'Retorna os dados detalhados de uma venda específica pelo ID, '
            'incluindo cliente, vendedor, valor total e itens vendidos.'
        ),
    ),
    update=extend_schema(
        tags=['Vendas'],
        summary='Atualiza venda',
        description=(
            'Atualiza todos os dados de uma venda existente, incluindo '
            'seus itens.'
        ),
    ),
    partial_update=extend_schema(
        tags=['Vendas'],
        summary='Atualiza parcialmente venda',
        description=(
            'Atualiza apenas os campos enviados para uma venda existente.'
        ),
    ),
    destroy=extend_schema(
        tags=['Vendas'],
        summary='Remove venda',
        description=(
            'Remove os ItensVenda dessa venda'
        ),
    ),
)