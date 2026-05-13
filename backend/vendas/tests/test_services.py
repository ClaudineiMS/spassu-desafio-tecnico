from datetime import datetime
from decimal import Decimal

from django.utils import timezone

from vendas.models import (
    Cliente,
    ItemVenda,
    Produto,
    RegraComissao,
    Venda,
    Vendedor,
)
from vendas.services.comissoes import (
    calcular_comissao_item,
    listar_comissoes_por_periodo,
    obter_percentual_comissao_aplicado,
)
from vendas.tests.base import LoggedTestCase


class ComissaoServiceTestCase(LoggedTestCase):
    def setUp(self):
        self.cliente = Cliente.objects.create(
            nome='Cliente Teste',
            email='cliente@email.com',
            telefone='31999999999',
        )
        self.vendedor = Vendedor.objects.create(
            nome='Vendedor Teste',
            email='vendedor@email.com',
            telefone='31988888888',
        )
        self.produto = Produto.objects.create(
            codigo='PROD-001',
            descricao='Produto Teste',
            valor_unitario=Decimal('100.00'),
            percentual_comissao=Decimal('10.00'),
        )
        self.data_segunda = timezone.make_aware(
            datetime(2026, 5, 11, 10, 0, 0)
        )
        self.venda = Venda.objects.create(
            numero_nota_fiscal='NF-001',
            data_hora=self.data_segunda,
            cliente=self.cliente,
            vendedor=self.vendedor,
        )

    def test_deve_aplicar_percentual_maximo_quando_produto_ultrapassa_limite(
        self,
    ):
        regra = RegraComissao.objects.create(
            dia_semana=RegraComissao.DiaSemana.SEGUNDA,
            percentual_minimo=Decimal('3.00'),
            percentual_maximo=Decimal('5.00'),
        )

        percentual = obter_percentual_comissao_aplicado(
            self.produto,
            self.data_segunda,
        )

        self.exibir_resultado(
            'Teste: percentual máximo aplicado',
            {
                'produto': self.produto.descricao,
                'percentual_produto': self.produto.percentual_comissao,
                'percentual_minimo_regra': regra.percentual_minimo,
                'percentual_maximo_regra': regra.percentual_maximo,
                'percentual_obtido': percentual,
                'percentual_esperado': Decimal('5.00'),
            },
        )

        self.assertEqual(percentual, Decimal('5.00'))

    def test_deve_aplicar_percentual_minimo_quando_produto_esta_abaixo_limite(
        self,
    ):
        produto = Produto.objects.create(
            codigo='PROD-002',
            descricao='Produto Comissão Baixa',
            valor_unitario=Decimal('100.00'),
            percentual_comissao=Decimal('2.00'),
        )
        regra = RegraComissao.objects.create(
            dia_semana=RegraComissao.DiaSemana.SEGUNDA,
            percentual_minimo=Decimal('3.00'),
            percentual_maximo=Decimal('5.00'),
        )

        percentual = obter_percentual_comissao_aplicado(
            produto,
            self.data_segunda,
        )

        self.exibir_resultado(
            'Teste: percentual mínimo aplicado',
            {
                'produto': produto.descricao,
                'percentual_produto': produto.percentual_comissao,
                'percentual_minimo_regra': regra.percentual_minimo,
                'percentual_maximo_regra': regra.percentual_maximo,
                'percentual_obtido': percentual,
                'percentual_esperado': Decimal('3.00'),
            },
        )

        self.assertEqual(percentual, Decimal('3.00'))

    def test_deve_manter_percentual_quando_esta_dentro_do_limite(self):
        produto = Produto.objects.create(
            codigo='PROD-003',
            descricao='Produto Comissão Média',
            valor_unitario=Decimal('100.00'),
            percentual_comissao=Decimal('4.00'),
        )
        regra = RegraComissao.objects.create(
            dia_semana=RegraComissao.DiaSemana.SEGUNDA,
            percentual_minimo=Decimal('3.00'),
            percentual_maximo=Decimal('5.00'),
        )

        percentual = obter_percentual_comissao_aplicado(
            produto,
            self.data_segunda,
        )

        self.exibir_resultado(
            'Teste: percentual mantido dentro do limite',
            {
                'produto': produto.descricao,
                'percentual_produto': produto.percentual_comissao,
                'percentual_minimo_regra': regra.percentual_minimo,
                'percentual_maximo_regra': regra.percentual_maximo,
                'percentual_obtido': percentual,
                'percentual_esperado': Decimal('4.00'),
            },
        )

        self.assertEqual(percentual, Decimal('4.00'))

    def test_deve_calcular_comissao_do_item_sem_regra(self):
        item = ItemVenda.objects.create(
            venda=self.venda,
            produto=self.produto,
            quantidade=2,
        )

        resultado = calcular_comissao_item(item)

        self.exibir_resultado(
            'Teste: comissão do item sem regra',
            {
                'produto': self.produto.descricao,
                'quantidade': item.quantidade,
                'valor_unitario': self.produto.valor_unitario,
                'percentual_comissao': self.produto.percentual_comissao,
                'calculo': '2 * 100.00 * 10.00 / 100',
                'resultado_obtido': resultado,
                'resultado_esperado': Decimal('20.00'),
            },
        )

        self.assertEqual(resultado, Decimal('20.00'))

    def test_deve_listar_comissoes_por_periodo_agrupadas_por_vendedor(self):
        ItemVenda.objects.create(
            venda=self.venda,
            produto=self.produto,
            quantidade=2,
        )

        resultado = listar_comissoes_por_periodo(
            data_inicio='2026-05-11',
            data_fim='2026-05-11',
        )

        self.exibir_resultado(
            'Teste: comissões agrupadas por vendedor',
            {
                'periodo': {
                    'data_inicio': '2026-05-11',
                    'data_fim': '2026-05-11',
                },
                'resultado_obtido': resultado,
                'resultado_esperado': {
                    'vendedores': [
                        {
                            'nome': 'Vendedor Teste',
                            'total_comissao': Decimal('20.00'),
                        },
                    ],
                    'total_geral': Decimal('20.00'),
                },
            },
        )

        self.assertEqual(len(resultado['vendedores']), 1)
        self.assertEqual(
            resultado['vendedores'][0]['nome'],
            'Vendedor Teste',
        )
        self.assertEqual(
            resultado['vendedores'][0]['total_comissao'],
            Decimal('20.00'),
        )
        self.assertEqual(resultado['total_geral'], Decimal('20.00'))
    
    def test_deve_falhar_propositalmente(self):
        self.assertEqual(Decimal('10.00'), Decimal('20.00'))