from django.core.validators import MinValueValidator
from django.db import models

from .pessoas import Cliente, Vendedor
from .produtos import Produto


class Venda(models.Model):
    numero_nota_fiscal = models.CharField(
        max_length=100,
        unique=True,
    )
    data_hora = models.DateTimeField()
    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.PROTECT,
        related_name='vendas',
    )
    vendedor = models.ForeignKey(
        Vendedor,
        on_delete=models.PROTECT,
        related_name='vendas',
    )

    class Meta:
        verbose_name = 'Venda'
        verbose_name_plural = 'Vendas'
        ordering = ['-data_hora']

    def __str__(self):
        return f'Nota fiscal {self.numero_nota_fiscal}'


class ItemVenda(models.Model):
    venda = models.ForeignKey(
        Venda,
        on_delete=models.CASCADE,
        related_name='itens',
    )
    produto = models.ForeignKey(
        Produto,
        on_delete=models.PROTECT,
        related_name='itens_venda',
    )
    quantidade = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
        ],
    )

    class Meta:
        verbose_name = 'Item da venda'
        verbose_name_plural = 'Itens da venda'

    def __str__(self):
        return f'{self.produto} - {self.quantidade} unidade(s)'