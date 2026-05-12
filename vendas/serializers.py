from rest_framework import serializers
from .models import Cliente, Produto, Vendedor

class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = [
            'id',
            'nome',
            'email',
            'telefone',
        ]
        read_only_fields = ['id']

    def validate_nome(self, value):
        nome = value.strip()
        if not nome:
            raise serializers.ValidationError('O nome do vendedor é obrigatório.')
        return nome

    def validate_telefone(self, value):
        telefone = value.strip()
        if not telefone:
            raise serializers.ValidationError('O telefone do vendedor é obrigatório.')
        return telefone
    
    def validate_email(self, value):
        email = value.strip().lower()
        if not email:
            raise serializers.ValidationError('O e-mail do vendedor é obrigatório.')
        return email




class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = [
            'id',
            'nome',
            'email',
            'telefone',
        ]
        read_only_fields = ['id']

    def validate_nome(self, value):
        nome = value.strip()
        if not nome:
            raise serializers.ValidationError('O nome do cliente é obrigatório.')
        return nome

    def validate_email(self, value):
        email = value.strip().lower()
        if not email:
            raise serializers.ValidationError('O e-mail do cliente é obrigatório.')
        return email

    def validate_telefone(self, value):
        telefone = value.strip()
        if not telefone:
            raise serializers.ValidationError('O telefone do cliente é obrigatório.')
        return telefone
    
    
class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = [
            'id',
            'codigo',
            'descricao',
            'valor_unitario',
            'percentual_comissao',
        ]
        read_only_fields = [
            'id',
        ]

    def validate_codigo(self, value):
        codigo = value.strip()
        if not codigo:
            raise serializers.ValidationError('O código do produto é obrigatório.')
        return codigo

    def validate_descricao(self, value):
        descricao = value.strip()
        if not descricao:
            raise serializers.ValidationError('A descrição do produto é obrigatória.')
        return descricao

    def validate_valor_unitario(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                'O valor unitário deve ser maior que zero.'
            )
        return value

    def validate_percentual_comissao(self, value):
        if value < 0 or value > 10:
            raise serializers.ValidationError(
                'O percentual de comissão deve estar entre 0 e 10%.'
            )
        return value