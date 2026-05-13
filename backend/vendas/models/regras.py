from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


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