from datetime import datetime, timedelta
from decimal import Decimal

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker

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
        self.fake = Faker('pt_BR')
        Faker.seed(0)

        self.total_clientes = settings.SEED_TOTAL_CLIENTES
        self.total_vendedores = settings.SEED_TOTAL_VENDEDORES
        self.total_produtos = settings.SEED_TOTAL_PRODUTOS
        self.total_vendas = settings.SEED_TOTAL_VENDAS
        self.itens_por_venda = settings.SEED_ITENS_POR_VENDA
        self.batch_size = settings.SEED_BATCH_SIZE

        self.validar_configuracoes()

        self.stdout.write('Iniciando carga inicial de dados...')
        self.stdout.write(
            (
                f'Configuração da carga: '
                f'{self.total_clientes} clientes, '
                f'{self.total_vendedores} vendedores, '
                f'{self.total_produtos} produtos, '
                f'{self.total_vendas} vendas, '
                f'{self.itens_por_venda} itens por venda, '
                f'batch size {self.batch_size}.'
            )
        )

        vendedores = self.criar_vendedores()
        clientes = self.criar_clientes()
        produtos = self.criar_produtos()

        self.criar_regras_comissao()
        self.criar_vendas(
            clientes=clientes,
            vendedores=vendedores,
        )
        self.criar_itens_venda(produtos=produtos)

        self.stdout.write(
            self.style.SUCCESS('Carga inicial finalizada com sucesso.')
        )

    def validar_configuracoes(self):
        configuracoes = {
            'SEED_TOTAL_CLIENTES': self.total_clientes,
            'SEED_TOTAL_VENDEDORES': self.total_vendedores,
            'SEED_TOTAL_PRODUTOS': self.total_produtos,
            'SEED_TOTAL_VENDAS': self.total_vendas,
            'SEED_ITENS_POR_VENDA': self.itens_por_venda,
            'SEED_BATCH_SIZE': self.batch_size,
        }

        for nome, valor in configuracoes.items():
            if valor <= 0:
                raise ValueError(f'{nome} deve ser maior que zero.')

    def criar_vendedores(self):
        vendedores_para_criar = []

        for indice in range(1, self.total_vendedores + 1):
            vendedores_para_criar.append(
                Vendedor(
                    nome=self.fake.name(),
                    email=f'vendedor{indice}@email.com',
                    telefone=self.fake.phone_number()[:20],
                )
            )

        Vendedor.objects.bulk_create(
            vendedores_para_criar,
            batch_size=self.batch_size,
            ignore_conflicts=True,
        )

        vendedores = list(
            Vendedor.objects.filter(
                email__startswith='vendedor',
            ).order_by('id')[:self.total_vendedores]
        )

        self.stdout.write(f'{len(vendedores)} vendedores disponíveis.')

        return vendedores

    def criar_clientes(self):
        clientes_para_criar = []

        for indice in range(1, self.total_clientes + 1):
            clientes_para_criar.append(
                Cliente(
                    nome=self.fake.name(),
                    email=f'cliente{indice}@email.com',
                    telefone=self.fake.phone_number()[:20],
                )
            )

        Cliente.objects.bulk_create(
            clientes_para_criar,
            batch_size=self.batch_size,
            ignore_conflicts=True,
        )

        clientes = list(
            Cliente.objects.filter(
                email__startswith='cliente',
            ).order_by('id')[:self.total_clientes]
        )

        self.stdout.write(f'{len(clientes)} clientes disponíveis.')

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

        produtos_para_criar = []

        for indice in range(1, self.total_produtos + 1):
            descricao, valor_unitario, percentual_comissao = produtos_base[
                (indice - 1) % len(produtos_base)
            ]

            produtos_para_criar.append(
                Produto(
                    codigo=f'PROD-{indice:06d}',
                    descricao=f'{descricao} {indice}',
                    valor_unitario=Decimal(valor_unitario),
                    percentual_comissao=Decimal(percentual_comissao),
                )
            )

        Produto.objects.bulk_create(
            produtos_para_criar,
            batch_size=self.batch_size,
            ignore_conflicts=True,
        )

        produtos = list(
            Produto.objects.filter(
                codigo__startswith='PROD-',
            ).order_by('id')[:self.total_produtos]
        )

        self.stdout.write(f'{len(produtos)} produtos disponíveis.')

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

        self.stdout.write('7 regras de comissão disponíveis.')

    def criar_vendas(self, clientes, vendedores):
        data_base = timezone.make_aware(datetime(2026, 5, 11, 9, 0, 0))
        vendas_para_criar = []

        for indice in range(1, self.total_vendas + 1):
            vendas_para_criar.append(
                Venda(
                    numero_nota_fiscal=f'NF-SEED-{indice:06d}',
                    data_hora=data_base + timedelta(minutes=indice),
                    cliente=clientes[(indice - 1) % len(clientes)],
                    vendedor=vendedores[(indice - 1) % len(vendedores)],
                )
            )

        Venda.objects.bulk_create(
            vendas_para_criar,
            batch_size=self.batch_size,
            ignore_conflicts=True,
        )

        total_vendas = Venda.objects.filter(
            numero_nota_fiscal__startswith='NF-SEED-',
        ).count()

        self.stdout.write(f'{total_vendas} vendas disponíveis.')

    def criar_itens_venda(self, produtos):
        vendas = list(
            Venda.objects.filter(
                numero_nota_fiscal__startswith='NF-SEED-',
            ).order_by('id')
        )

        vendas_com_itens = set(
            ItemVenda.objects.filter(
                venda__numero_nota_fiscal__startswith='NF-SEED-',
            ).values_list('venda_id', flat=True)
        )

        itens_para_criar = []

        for venda_indice, venda in enumerate(vendas, start=1):
            if venda.id in vendas_com_itens:
                continue

            for item_indice in range(self.itens_por_venda):
                produto = produtos[
                    (venda_indice + item_indice - 1) % len(produtos)
                ]

                itens_para_criar.append(
                    ItemVenda(
                        venda=venda,
                        produto=produto,
                        quantidade=((venda_indice + item_indice) % 3) + 1,
                    )
                )

        ItemVenda.objects.bulk_create(
            itens_para_criar,
            batch_size=self.batch_size,
            ignore_conflicts=True,
        )

        total_itens = ItemVenda.objects.filter(
            venda__numero_nota_fiscal__startswith='NF-SEED-',
        ).count()

        self.stdout.write(f'{total_itens} itens de venda disponíveis.')