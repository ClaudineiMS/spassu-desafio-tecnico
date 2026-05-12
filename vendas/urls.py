from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ClienteViewSet, ProdutoViewSet, VendaViewSet, VendedorViewSet

router = DefaultRouter()
router.register(
    r'vendedores',
    VendedorViewSet,
    basename='vendedores',
)

router.register(
    r'clientes',
    ClienteViewSet,
    basename='clientes',
)

router.register(
    r'produtos',
    ProdutoViewSet,
    basename='produtos',
)

router.register(
    r'vendas',
    VendaViewSet,
    basename='vendas',
)

urlpatterns = [
    path('', include(router.urls)),
]