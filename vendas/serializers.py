from rest_framework import serializers
from .models import Vendedor

class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = [
            'id',
            'usuario',
            'nome',
            'email',
            'telefone',
        ]
        read_only_fields = [
            'id',
        ]

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