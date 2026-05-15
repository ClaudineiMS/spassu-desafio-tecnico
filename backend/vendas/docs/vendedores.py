from drf_spectacular.utils import extend_schema, extend_schema_view


vendedor_schema = extend_schema_view(
    list=extend_schema(
        tags=['Vendedores'],
        summary='Lista vendedores',
        description=(
            'Retorna a lista paginada de vendedores cadastrados no sistema.'
        ),
    ),
    create=extend_schema(
        tags=['Vendedores'],
        summary='Cria vendedor',
        description=(
            'Cria um novo vendedor informando nome, e-mail e telefone.'
        ),
    ),
    retrieve=extend_schema(
        tags=['Vendedores'],
        summary='Detalha vendedor',
        description=(
            'Retorna os dados detalhados de um vendedor específico pelo ID.'
        ),
    ),
    update=extend_schema(
        tags=['Vendedores'],
        summary='Atualiza vendedor',
        description='Atualiza todos os dados de um vendedor existente.',
    ),
    partial_update=extend_schema(
        tags=['Vendedores'],
        summary='Atualiza parcialmente vendedor',
        description=(
            'Atualiza apenas os campos enviados para um vendedor existente.'
        ),
    ),
    destroy=extend_schema(
        tags=['Vendedores'],
        summary='Remove vendedor',
        description=(
            'Remove as Vendas desse vendedor e remove os ItensVenda dessas vendas'
        ),
    ),
)