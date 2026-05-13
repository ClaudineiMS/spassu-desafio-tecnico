from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings
from django.db import models
from jsonschema import ValidationError

class Vendedor(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20)

    def __str__(self):
        return self.nome

class Cliente(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20)

    def __str__(self):
        return self.nome
    
class Produto(models.Model):
    codigo = models.CharField(max_length=50, unique=True)
    descricao = models.CharField(max_length=255)
    valor_unitario = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    percentual_comissao = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10),
        ],
    )

    def __str__(self):
        return f'{self.codigo} - {self.descricao}'
    
    
class RegraComissao(models.Model):
    class DiaSemana(models.IntegerChoices):
        SEGUNDA = 0, 'Segunda-feira'
        TERCA = 1, 'Terça-feira'
        QUARTA = 2, 'Quarta-feira'
        QUINTA = 3, 'Quinta-feira'
        SEXTA = 4, 'Sexta-feira'
        SABADO = 5, 'Sábado'
        DOMINGO = 6, 'Domingo'

    dia_semana = models.PositiveSmallIntegerField(
        choices=DiaSemana.choices,
        unique=True,
    )
    percentual_minimo = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10),
        ],
    )
    percentual_maximo = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10),
        ],
    )

    class Meta:
        verbose_name = 'Regra de comissão'
        verbose_name_plural = 'Regras de comissão'
        ordering = ['dia_semana']

    def __str__(self):
        return (
            f'{self.get_dia_semana_display()} '
            f'({self.percentual_minimo}% - {self.percentual_maximo}%)'
        )

    def clean(self):
        if self.percentual_minimo > self.percentual_maximo:
            raise ValidationError({
                'percentual_minimo': (
                    'O percentual mínimo não pode ser maior '
                    'que o percentual máximo.'
                )
            })
            
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