from drf_spectacular.utils import extend_schema, extend_schema_view


cliente_schema = extend_schema_view(
    list=extend_schema(
        tags=['Clientes'],
        summary='Lista clientes',
        description=(
            'Retorna a lista paginada de clientes cadastrados no sistema.'
        ),
    ),
    create=extend_schema(
        tags=['Clientes'],
        summary='Cria cliente',
        description=(
            'Cria um novo cliente informando nome, e-mail e telefone.'
        ),
    ),
    retrieve=extend_schema(
        tags=['Clientes'],
        summary='Detalha cliente',
        description=(
            'Retorna os dados detalhados de um cliente específico pelo ID.'
        ),
    ),
    update=extend_schema(
        tags=['Clientes'],
        summary='Atualiza cliente',
        description='Atualiza todos os dados de um cliente existente.',
    ),
    partial_update=extend_schema(
        tags=['Clientes'],
        summary='Atualiza parcialmente cliente',
        description=(
            'Atualiza apenas os campos enviados para um cliente existente.'
        ),
    ),
    destroy=extend_schema(
        tags=['Clientes'],
        summary='Remove cliente',
        description=(
            'Remove um cliente do sistema e remove os ItensVenda dessas vendas'
        ),
    ),
)