import logging
from collections import defaultdict
from datetime import datetime, time
from decimal import Decimal

from django.utils import timezone
from django.utils.dateparse import parse_date

from vendas.models import ItemVenda, RegraComissao, Venda
from django.db.models import Count
logger = logging.getLogger(__name__)


def converter_data_para_date(data):
    if hasattr(data, 'year') and hasattr(data, 'month') and hasattr(data, 'day'):
        return data

    data_convertida = parse_date(str(data))

    if not data_convertida:
        raise ValueError('Data inválida. Use o formato YYYY-MM-DD.')

    return data_convertida


def montar_periodo(data_inicio, data_fim):
    data_inicio_convertida = converter_data_para_date(data_inicio)
    data_fim_convertida = converter_data_para_date(data_fim)

    inicio = datetime.combine(data_inicio_convertida, time.min)
    fim = datetime.combine(data_fim_convertida, time.max)

    if timezone.is_naive(inicio):
        inicio = timezone.make_aware(inicio)

    if timezone.is_naive(fim):
        fim = timezone.make_aware(fim)

    return inicio, fim


def carregar_regras_comissao():
    regras = RegraComissao.objects.all()

    return {
        regra.dia_semana: regra
        for regra in regras
    }


def obter_percentual_comissao_aplicado(produto, data_hora):
    percentual = produto.percentual_comissao
    dia_semana = data_hora.weekday()

    regra = RegraComissao.objects.filter(
        dia_semana=dia_semana,
    ).first()

    if not regra:
        return percentual

    return aplicar_limite_percentual(percentual, regra)


def aplicar_limite_percentual(percentual, regra):
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


def calcular_comissao_por_valores(
    quantidade,
    valor_unitario,
    percentual_comissao,
    data_hora,
    regras_por_dia,
):
    dia_semana = data_hora.weekday()
    regra = regras_por_dia.get(dia_semana)
    percentual = percentual_comissao

    if regra:
        percentual = aplicar_limite_percentual(percentual, regra)

    valor_total_item = quantidade * valor_unitario

    return valor_total_item * percentual / Decimal('100')


def listar_comissoes_por_periodo(data_inicio, data_fim):
    logger.info(
        'Calculando comissões do período %s até %s',
        data_inicio,
        data_fim,
    )

    inicio, fim = montar_periodo(
        data_inicio=data_inicio,
        data_fim=data_fim,
    )

    regras_por_dia = carregar_regras_comissao()

    itens = (
        ItemVenda.objects.filter(
            venda__data_hora__gte=inicio,
            venda__data_hora__lte=fim,
        )
        .values(
            'quantidade',
            'produto__valor_unitario',
            'produto__percentual_comissao',
            'venda__data_hora',
            'venda__vendedor_id',
            'venda__vendedor__nome',
        )
        .iterator(chunk_size=2000)
    )

    totais_por_vendedor = defaultdict(lambda: Decimal('0.00'))
    nomes_por_vendedor = {}

    for item in itens:
        vendedor_id = item['venda__vendedor_id']
        nomes_por_vendedor[vendedor_id] = item['venda__vendedor__nome']

        valor_comissao = calcular_comissao_por_valores(
            quantidade=item['quantidade'],
            valor_unitario=item['produto__valor_unitario'],
            percentual_comissao=item['produto__percentual_comissao'],
            data_hora=item['venda__data_hora'],
            regras_por_dia=regras_por_dia,
        )

        totais_por_vendedor[vendedor_id] += valor_comissao

    vendas_por_vendedor = contar_vendas_por_vendedor(
        inicio=inicio,
        fim=fim,
    )

    vendedores = []

    for vendedor_id, venda_info in vendas_por_vendedor.items():
        total_comissao = totais_por_vendedor.get(
            vendedor_id,
            Decimal('0.00'),
        )

        vendedores.append({
            'id': vendedor_id,
            'nome': venda_info['nome'],
            'total_vendas': venda_info['total_vendas'],
            'total_comissao': total_comissao.quantize(Decimal('0.01')),
        })

    vendedores.sort(key=lambda item: item['nome'])

    total_geral = sum(
        (
            item['total_comissao']
            for item in vendedores
        ),
        Decimal('0.00'),
    )

    logger.info(
        'Relatório de comissões gerado com %s vendedor(es)',
        len(vendedores),
    )

    return {
        'vendedores': vendedores,
        'total_geral': total_geral.quantize(Decimal('0.01')),
    }

def contar_vendas_por_vendedor(inicio, fim):
    vendas_por_vendedor = (
        Venda.objects.filter(
            data_hora__gte=inicio,
            data_hora__lte=fim,
        )
        .values(
            'vendedor_id',
            'vendedor__nome',
        )
        .annotate(
            total_vendas=Count('id'),
        )
    )

    return {
        venda['vendedor_id']: {
            'nome': venda['vendedor__nome'],
            'total_vendas': venda['total_vendas'],
        }
        for venda in vendas_por_vendedor
    }