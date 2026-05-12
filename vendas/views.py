from rest_framework import viewsets

from .models import Cliente, Vendedor
from .serializers import ClienteSerializer, VendedorSerializer


class VendedorViewSet(viewsets.ModelViewSet):
    queryset = Vendedor.objects.all().order_by('nome')
    serializer_class = VendedorSerializer
    

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all().order_by('nome')
    serializer_class = ClienteSerializer