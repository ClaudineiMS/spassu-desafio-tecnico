from datetime import datetime, timedelta
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.utils import timezone

from vendas.models import (
    Cliente,
    ItemVenda,
    Produto,
    RegraComissao,
    Venda,
    Vendedor,
)


class Command(BaseCommand):
    help = 'Cria dados iniciais para testes da aplicação.'

    def handle(self, *args, **options):
        self.stdout.write('Iniciando carga inicial de dados...')

        vendedores = self.criar_vendedores()
        clientes = self.criar_clientes()
        produtos = self.criar_produtos()
        self.criar_regras_comissao()
        self.criar_vendas(
            clientes=clientes,
            vendedores=vendedores,
            produtos=produtos,
        )

        self.stdout.write(
            self.style.SUCCESS('Carga inicial finalizada com sucesso.')
        )

    def criar_vendedores(self):
        vendedores = []

        for indice in range(1, 21):
            vendedor, _ = Vendedor.objects.get_or_create(
                email=f'vendedor{indice}@email.com',
                defaults={
                    'nome': f'Vendedor {indice}',
                    'telefone': f'3199999{indice:04d}',
                },
            )
            vendedores.append(vendedor)

        return vendedores

    def criar_clientes(self):
        clientes = []

        for indice in range(1, 21):
            cliente, _ = Cliente.objects.get_or_create(
                email=f'cliente{indice}@email.com',
                defaults={
                    'nome': f'Cliente {indice}',
                    'telefone': f'3188888{indice:04d}',
                },
            )
            clientes.append(cliente)

        return clientes

    def criar_produtos(self):
        produtos_base = [
            ('Papel sulfite A4 500 folhas', '28.50', '4.50'),
            ('Caderno universitário 10 matérias', '32.90', '4.00'),
            ('Caneta esferográfica azul', '2.50', '3.00'),
            ('Caneta esferográfica preta', '2.50', '3.00'),
            ('Lápis grafite HB', '1.80', '2.00'),
            ('Borracha branca escolar', '1.50', '2.50'),
            ('Apontador com depósito', '4.90', '3.50'),
            ('Estojo escolar simples', '18.90', '5.00'),
            ('Mochila escolar reforçada', '159.90', '6.00'),
            ('Cola branca 90g', '5.90', '3.00'),
            ('Tesoura escolar sem ponta', '8.90', '4.00'),
            ('Marca-texto amarelo', '6.50', '5.00'),
            ('Régua transparente 30cm', '3.20', '2.00'),
            ('Grampeador pequeno', '19.90', '4.00'),
            ('Clips galvanizado 100 unidades', '7.90', '3.00'),
            ('Pasta catálogo 50 plásticos', '24.90', '4.50'),
            ('Corretivo líquido 18ml', '6.90', '3.50'),
            ('Fita adesiva transparente', '4.50', '2.50'),
            ('Calculadora de mesa', '45.00', '5.00'),
            ('Agenda anual capa dura', '39.90', '4.00'),
        ]

        produtos = []

        for indice, dados in enumerate(produtos_base, start=1):
            descricao, valor_unitario, percentual_comissao = dados

            produto, _ = Produto.objects.get_or_create(
                codigo=f'PROD-{indice:06d}',
                defaults={
                    'descricao': descricao,
                    'valor_unitario': Decimal(valor_unitario),
                    'percentual_comissao': Decimal(percentual_comissao),
                },
            )
            produtos.append(produto)

        return produtos

    def criar_regras_comissao(self):
        regras = [
            (RegraComissao.DiaSemana.SEGUNDA, '3.00', '5.00'),
            (RegraComissao.DiaSemana.TERCA, '2.00', '6.00'),
            (RegraComissao.DiaSemana.QUARTA, '3.00', '7.00'),
            (RegraComissao.DiaSemana.QUINTA, '2.50', '6.50'),
            (RegraComissao.DiaSemana.SEXTA, '3.00', '5.50'),
            (RegraComissao.DiaSemana.SABADO, '2.00', '4.50'),
            (RegraComissao.DiaSemana.DOMINGO, '1.00', '3.50'),
        ]

        for dia_semana, percentual_minimo, percentual_maximo in regras:
            RegraComissao.objects.update_or_create(
                dia_semana=dia_semana,
                defaults={
                    'percentual_minimo': Decimal(percentual_minimo),
                    'percentual_maximo': Decimal(percentual_maximo),
                },
            )

    def criar_vendas(self, clientes, vendedores, produtos):
        data_base = timezone.make_aware(datetime(2026, 5, 11, 9, 0, 0))

        for indice in range(1, 21):
            venda, created = Venda.objects.get_or_create(
                numero_nota_fiscal=f'NF-SEED-{indice:06d}',
                defaults={
                    'data_hora': data_base + timedelta(days=indice - 1),
                    'cliente': clientes[(indice - 1) % len(clientes)],
                    'vendedor': vendedores[(indice - 1) % len(vendedores)],
                },
            )

            if not created:
                continue

            produto_principal = produtos[(indice - 1) % len(produtos)]
            produto_secundario = produtos[indice % len(produtos)]

            ItemVenda.objects.create(
                venda=venda,
                produto=produto_principal,
                quantidade=(indice % 3) + 1,
            )
            ItemVenda.objects.create(
                venda=venda,
                produto=produto_secundario,
                quantidade=(indice % 2) + 1,
            )