import logging

from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import Cliente, Produto, Venda, Vendedor

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Cliente)
def registrar_log_cliente(sender, instance, created, **kwargs):
    acao = 'cadastrado' if created else 'atualizado'

    logger.info(
        'Cliente %s: id=%s, nome=%s, email=%s',
        acao,
        instance.id,
        instance.nome,
        instance.email,
    )


@receiver(post_delete, sender=Cliente)
def registrar_log_cliente_removido(sender, instance, **kwargs):
    logger.info(
        'Cliente removido: id=%s, nome=%s, email=%s',
        instance.id,
        instance.nome,
        instance.email,
    )


@receiver(post_save, sender=Vendedor)
def registrar_log_vendedor(sender, instance, created, **kwargs):
    acao = 'cadastrado' if created else 'atualizado'

    logger.info(
        'Vendedor %s: id=%s, nome=%s, email=%s',
        acao,
        instance.id,
        instance.nome,
        instance.email,
    )


@receiver(post_delete, sender=Vendedor)
def registrar_log_vendedor_removido(sender, instance, **kwargs):
    logger.info(
        'Vendedor removido: id=%s, nome=%s, email=%s',
        instance.id,
        instance.nome,
        instance.email,
    )


@receiver(post_save, sender=Produto)
def registrar_log_produto(sender, instance, created, **kwargs):
    acao = 'cadastrado' if created else 'atualizado'

    logger.info(
        'Produto %s: id=%s, codigo=%s, descricao=%s',
        acao,
        instance.id,
        instance.codigo,
        instance.descricao,
    )


@receiver(post_delete, sender=Produto)
def registrar_log_produto_removido(sender, instance, **kwargs):
    logger.info(
        'Produto removido: id=%s, codigo=%s, descricao=%s',
        instance.id,
        instance.codigo,
        instance.descricao,
    )


@receiver(post_save, sender=Venda)
def registrar_log_venda(sender, instance, created, **kwargs):
    acao = 'cadastrada' if created else 'atualizada'

    logger.info(
        'Venda %s: id=%s, nota_fiscal=%s, cliente=%s, vendedor=%s',
        acao,
        instance.id,
        instance.numero_nota_fiscal,
        instance.cliente.nome,
        instance.vendedor.nome,
    )


@receiver(post_delete, sender=Venda)
def registrar_log_venda_removida(sender, instance, **kwargs):
    logger.info(
        'Venda removida: id=%s, nota_fiscal=%s, cliente=%s, vendedor=%s',
        instance.id,
        instance.numero_nota_fiscal,
        instance.cliente.nome,
        instance.vendedor.nome,
    )