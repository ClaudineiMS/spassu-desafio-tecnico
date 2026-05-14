from datetime import datetime
from decimal import Decimal

from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient

from vendas.models import (
    Cliente,
    ItemVenda,
    Produto,
    RegraComissao,
    Venda,
    Vendedor,
)
from vendas.tests.base import LoggedTestCase


class ApiTestCase(LoggedTestCase):
    def setUp(self):
        self.client = APIClient()

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
        self.data_venda = timezone.make_aware(
            datetime(2026, 5, 11, 10, 0, 0)
        )

    def test_deve_criar_cliente(self):
        payload = {
            'nome': 'Novo Cliente',
            'email': 'novo.cliente@email.com',
            'telefone': '31977777777',
        }

        response = self.client.post(
            '/api/clientes/',
            payload,
            format='json',
        )

        self.exibir_resultado(
            'API: criar cliente',
            {
                'payload': payload,
                'status_code': response.status_code,
                'response': response.data,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nome'], payload['nome'])
        self.assertEqual(response.data['email'], payload['email'])

    def test_deve_listar_clientes(self):
        response = self.client.get('/api/clientes/')

        self.exibir_resultado(
            'API: listar clientes',
            {
                'status_code': response.status_code,
                'response': response.data,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_deve_criar_vendedor(self):
        payload = {
            'nome': 'Novo Vendedor',
            'email': 'novo.vendedor@email.com',
            'telefone': '31966666666',
        }

        response = self.client.post(
            '/api/vendedores/',
            payload,
            format='json',
        )

        self.exibir_resultado(
            'API: criar vendedor',
            {
                'payload': payload,
                'status_code': response.status_code,
                'response': response.data,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nome'], payload['nome'])
        self.assertEqual(response.data['email'], payload['email'])

    def test_deve_criar_produto(self):
        payload = {
            'codigo': 'PROD-002',
            'descricao': 'Produto Criado Pela API',
            'valor_unitario': '50.00',
            'percentual_comissao': '5.00',
        }

        response = self.client.post(
            '/api/produtos/',
            payload,
            format='json',
        )

        self.exibir_resultado(
            'API: criar produto',
            {
                'payload': payload,
                'status_code': response.status_code,
                'response': response.data,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['codigo'], payload['codigo'])
        self.assertEqual(response.data['descricao'], payload['descricao'])

    def test_deve_criar_venda_com_itens(self):
        payload = {
            'numero_nota_fiscal': 'NF-API-001',
            'data_hora': '2026-05-11T10:00:00-03:00',
            'cliente': self.cliente.id,
            'vendedor': self.vendedor.id,
            'itens': [
                {
                    'produto': self.produto.id,
                    'quantidade': 2,
                },
            ],
        }

        response = self.client.post(
            '/api/vendas/',
            payload,
            format='json',
        )

        self.exibir_resultado(
            'API: criar venda com itens',
            {
                'payload': payload,
                'status_code': response.status_code,
                'response': response.data,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data['numero_nota_fiscal'],
            payload['numero_nota_fiscal'],
        )
        self.assertEqual(len(response.data['itens']), 1)

    def test_nao_deve_criar_venda_sem_itens(self):
        payload = {
            'numero_nota_fiscal': 'NF-API-002',
            'data_hora': '2026-05-11T10:00:00-03:00',
            'cliente': self.cliente.id,
            'vendedor': self.vendedor.id,
            'itens': [],
        }

        response = self.client.post(
            '/api/vendas/',
            payload,
            format='json',
        )

        self.exibir_resultado(
            'API: não criar venda sem itens',
            {
                'payload': payload,
                'status_code': response.status_code,
                'response': response.data,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_deve_listar_vendas(self):
        venda = Venda.objects.create(
            numero_nota_fiscal='NF-LIST-001',
            data_hora=self.data_venda,
            cliente=self.cliente,
            vendedor=self.vendedor,
        )
        ItemVenda.objects.create(
            venda=venda,
            produto=self.produto,
            quantidade=2,
        )

        response = self.client.get('/api/vendas/')

        self.exibir_resultado(
            'API: listar vendas',
            {
                'status_code': response.status_code,
                'response': response.data,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_deve_retornar_comissoes_por_periodo(self):
        RegraComissao.objects.create(
            dia_semana=RegraComissao.DiaSemana.SEGUNDA,
            percentual_minimo=Decimal('3.00'),
            percentual_maximo=Decimal('5.00'),
        )
        venda = Venda.objects.create(
            numero_nota_fiscal='NF-COM-001',
            data_hora=self.data_venda,
            cliente=self.cliente,
            vendedor=self.vendedor,
        )
        ItemVenda.objects.create(
            venda=venda,
            produto=self.produto,
            quantidade=2,
        )

        response = self.client.get(
            '/api/comissoes/',
            {
                'data_inicio': '2026-05-11',
                'data_fim': '2026-05-11',
            },
        )

        self.exibir_resultado(
            'API: comissões por período',
            {
                'status_code': response.status_code,
                'response': response.data,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(
            response.data['results'][0]['nome'],
            'Vendedor Teste',
        )
        self.assertEqual(
            Decimal(response.data['results'][0]['total_comissao']),
            Decimal('10.00'),
        )
        self.assertEqual(
            Decimal(response.data['total_geral']),
            Decimal('10.00'),
        )
        
    # def test_deve_falhar_propositalmente(self):
    #     response = self.client.get('/api/clientes/')

    #     self.exibir_resultado(
    #         'API: teste propositalmente falhando',
    #         {
    #             'status_code_obtido': response.status_code,
    #             'status_code_esperado': status.HTTP_201_CREATED,
    #             'observacao': (
    #                 'Este teste deve falhar porque uma listagem GET retorna 200, '
    #                 'não 201.'
    #             ),
    #         },
    #     )

    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)