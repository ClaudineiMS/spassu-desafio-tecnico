from rest_framework import serializers
from .models import Cliente, ItemVenda, Produto, Venda, Vendedor

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
    
class ItemVendaSerializer(serializers.ModelSerializer):
    produto_descricao = serializers.CharField(
        source='produto.descricao',
        read_only=True,
    )
    valor_unitario = serializers.DecimalField(
        source='produto.valor_unitario',
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )
    percentual_comissao = serializers.DecimalField(
        source='produto.percentual_comissao',
        max_digits=5,
        decimal_places=2,
        read_only=True,
    )
    valor_total = serializers.SerializerMethodField()

    class Meta:
        model = ItemVenda
        fields = [
            'id',
            'produto',
            'produto_descricao',
            'quantidade',
            'valor_unitario',
            'percentual_comissao',
            'valor_total',
        ]
        read_only_fields = [
            'id',
            'produto_descricao',
            'valor_unitario',
            'percentual_comissao',
            'valor_total',
        ]

    def get_valor_total(self, obj):
        return obj.quantidade * obj.produto.valor_unitario

    def validate_quantidade(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                'A quantidade deve ser maior que zero.'
            )

        return value
    
class VendaSerializer(serializers.ModelSerializer):
    itens = ItemVendaSerializer(many=True)
    cliente_nome = serializers.CharField(
        source='cliente.nome',
        read_only=True,
    )
    vendedor_nome = serializers.CharField(
        source='vendedor.nome',
        read_only=True,
    )
    valor_total = serializers.SerializerMethodField()

    class Meta:
        model = Venda
        fields = [
            'id',
            'numero_nota_fiscal',
            'data_hora',
            'cliente',
            'cliente_nome',
            'vendedor',
            'vendedor_nome',
            'itens',
            'valor_total',
        ]
        read_only_fields = [
            'id',
            'cliente_nome',
            'vendedor_nome',
            'valor_total',
        ]

    def get_valor_total(self, obj):
        return sum(
            item.quantidade * item.produto.valor_unitario
            for item in obj.itens.all()
        )

    def validate_itens(self, value):
        if not value:
            raise serializers.ValidationError(
                'A venda deve possuir pelo menos um item.'
            )
        return value

    def create(self, validated_data):
        itens_data = validated_data.pop('itens')
        venda = Venda.objects.create(**validated_data)

        for item_data in itens_data:
            ItemVenda.objects.create(
                venda=venda,
                **item_data,
            )
        return venda

    def update(self, instance, validated_data):
        itens_data = validated_data.pop('itens', None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        if itens_data is not None:
            instance.itens.all().delete()

            for item_data in itens_data:
                ItemVenda.objects.create(
                    venda=instance,
                    **item_data,
                )
        return instance