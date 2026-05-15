from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiParameter,
    extend_schema,
    extend_schema_view,
)


comissao_schema = extend_schema_view(
    list=extend_schema(
        tags=['Comissões'],
        summary='Lista comissões por período',
        description=(
            'Retorna o relatório de comissões agrupado por vendedor dentro '
            'do período informado. O cálculo considera o percentual de '
            'comissão do produto e aplica os limites mínimo e máximo definidos '
            'nas regras de comissão por dia da semana.'
        ),
        parameters=[
            OpenApiParameter(
                name='data_inicio',
                description='Data inicial do período no formato YYYY-MM-DD.',
                required=True,
                type=str,
            ),
            OpenApiParameter(
                name='data_fim',
                description='Data final do período no formato YYYY-MM-DD.',
                required=True,
                type=str,
            ),
            OpenApiParameter(
                name='page',
                description='Número da página dos vendedores retornados.',
                required=False,
                type=int,
            ),
        ],
        examples=[
            OpenApiExample(
                name='Consulta de comissões por período',
                summary='Exemplo de consulta',
                description=(
                    'Consulta as comissões geradas entre 11/05/2026 '
                    'e 18/05/2026.'
                ),
                value={
                    'data_inicio': '2026-05-11',
                    'data_fim': '2026-05-18',
                },
                request_only=True,
            ),
            OpenApiExample(
                name='Resposta paginada de comissões',
                summary='Exemplo de resposta',
                value={
                    'count': 1,
                    'next': None,
                    'previous': None,
                    'results': [
                        {
                            'id': 1,
                            'nome': 'Vendedor Teste',
                            'total_comissao': '125.50',
                        }
                    ],
                    'data_inicio': '2026-05-11',
                    'data_fim': '2026-05-18',
                    'total_geral': '125.50',
                },
                response_only=True,
            ),
            OpenApiExample(
                name='Parâmetros obrigatórios ausentes',
                summary='Exemplo de erro',
                value={
                    'detail': (
                        'Informe os parâmetros data_inicio e data_fim '
                        'no formato YYYY-MM-DD.'
                    )
                },
                response_only=True,
                status_codes=['400'],
            ),
        ],
    ),
)