#!/bin/sh

echo "Aplicando migrations..."
python manage.py migrate --noinput

echo "Criando superusuário padrão, se necessário..."
python manage.py shell << END
from django.contrib.auth import get_user_model

User = get_user_model()

username = "admin"
email = "admin@email.com"
password = "admin"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
    )
    print("Superusuário admin criado com sucesso.")
else:
    print("Superusuário admin já existe.")
END

if [ "$RUN_TESTS_ON_STARTUP" = "True" ]; then
    echo "Executando testes automatizados..."
    python manage.py test
fi

echo "Iniciando servidor..."
exec "$@"