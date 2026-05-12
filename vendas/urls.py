from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import VendedorViewSet

router = DefaultRouter()
router.register(
    r'vendedores',
    VendedorViewSet,
    basename='vendedores',
)

urlpatterns = [
    path('', include(router.urls)),
]