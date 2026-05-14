from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
   
    def handle(self, *args, **options):
        username = getattr(settings, 'DEFAULT_SUPERUSER_USERNAME', None)
        email = getattr(settings, 'DEFAULT_SUPERUSER_EMAIL', None)
        password = getattr(settings, 'DEFAULT_SUPERUSER_PASSWORD', None)

        if not username or not email or not password:
            self.stdout.write(
                self.style.WARNING(
                    'Superusuário padrão não criado. '
                    'Configure DEFAULT_SUPERUSER_USERNAME, '
                    'DEFAULT_SUPERUSER_EMAIL e DEFAULT_SUPERUSER_PASSWORD.'
                )
            )
            return

        User = get_user_model()

        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.WARNING(
                    f'Superusuário "{username}" já existe.'
                )
            )
            return

        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )

        self.stdout.write(
            self.style.SUCCESS(
                f'Superusuário "{username}" criado com sucesso.'
            )
        )