from collections import defaultdict
from decimal import Decimal

from vendas.models import RegraComissao, Venda


def obter_percentual_comissao_aplicado(produto, data_hora):
    percentual = produto.percentual_comissao
    dia_semana = data_hora.weekday()

    regra = RegraComissao.objects.filter(
        dia_semana=dia_semana,
    ).first()

    if not regra:
        return percentual

    if percentual < regra.percentual_minimo:
        return regra.percentual_minimo

    if percentual > regra.percentual_maximo:
        return regra.percentual_maximo

    return percentual


def calcular_comissao_item(item):
    percentual = obter_percentual_comissao_aplicado(
        item.produto,
        item.venda.data_hora,
    )
    valor_total_item = item.quantidade * item.produto.valor_unitario

    return valor_total_item * percentual / Decimal('100')


def listar_comissoes_por_periodo(data_inicio, data_fim):
    vendas = Venda.objects.filter(
        data_hora__date__gte=data_inicio,
        data_hora__date__lte=data_fim,
    ).select_related(
        'vendedor',
    ).prefetch_related(
        'itens__produto',
    )

    totais_por_vendedor = defaultdict(Decimal)

    for venda in vendas:
        for item in venda.itens.all():
            totais_por_vendedor[venda.vendedor] += calcular_comissao_item(item)

    vendedores = []

    for vendedor, total in totais_por_vendedor.items():
        vendedores.append({
            'id': vendedor.id,
            'nome': vendedor.nome,
            'total_comissao': total.quantize(Decimal('0.01')),
        })

    vendedores.sort(key=lambda item: item['nome'])

    total_geral = sum(
        item['total_comissao']
        for item in vendedores
    )

    return {
        'vendedores': vendedores,
        'total_geral': total_geral.quantize(Decimal('0.01')),
    }