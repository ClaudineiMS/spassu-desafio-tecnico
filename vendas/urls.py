from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ClienteViewSet, ProdutoViewSet, VendedorViewSet

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

urlpatterns = [
    path('', include(router.urls)),
]