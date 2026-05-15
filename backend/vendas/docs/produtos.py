from drf_spectacular.utils import (
    OpenApiExample,
    extend_schema,
    extend_schema_view,
)


produto_schema = extend_schema_view(
    list=extend_schema(
        tags=['Produtos'],
        summary='Lista produtos',
        description=(
            'Retorna a lista paginada de produtos cadastrados no sistema. '
            'Os produtos são utilizados no cadastro de vendas e no cálculo '
            'das comissões dos vendedores.'
        ),
    ),
    create=extend_schema(
        tags=['Produtos'],
        summary='Cria produto',
        description=(
            'Cria um novo produto informando código, descrição, valor '
            'unitário e percentual de comissão. Caso o código não seja '
            'informado, o sistema pode gerar um código automaticamente, '
            'conforme a regra implementada no model.'
        ),
        examples=[
            OpenApiExample(
                name='Criação de produto',
                summary='Exemplo de criação de produto',
                value={
                    'codigo': 'PROD-000001',
                    'descricao': 'Papel sulfite A4 500 folhas',
                    'valor_unitario': '28.50',
                    'percentual_comissao': '4.50',
                },
                request_only=True,
            ),
            OpenApiExample(
                name='Criação de produto sem código',
                summary='Exemplo com código gerado automaticamente',
                value={
                    'descricao': 'Caderno universitário 10 matérias',
                    'valor_unitario': '32.90',
                    'percentual_comissao': '4.00',
                },
                request_only=True,
            ),
        ],
    ),
    retrieve=extend_schema(
        tags=['Produtos'],
        summary='Detalha produto',
        description=(
            'Retorna os dados detalhados de um produto específico pelo ID.'
        ),
    ),
    update=extend_schema(
        tags=['Produtos'],
        summary='Atualiza produto',
        description=(
            'Atualiza todos os dados de um produto existente, incluindo '
            'código, descrição, valor unitário e percentual de comissão.'
        ),
    ),
    partial_update=extend_schema(
        tags=['Produtos'],
        summary='Atualiza parcialmente produto',
        description=(
            'Atualiza apenas os campos enviados para um produto existente.'
        ),
    ),
    destroy=extend_schema(
        tags=['Produtos'],
        summary='Remove produto',
        description=(
            'Remove os ItensVenda vinculados a esse produto'
        ),
    ),
)