from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


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