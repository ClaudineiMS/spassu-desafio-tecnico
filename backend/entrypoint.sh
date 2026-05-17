#!/bin/sh

echo "Configurando permissões dos logs..."
mkdir -p logs
touch logs/app.log
touch logs/test_logs_file.log
chmod -R a+rwX logs

umask 000

echo "Aplicando migrations..."
python manage.py migrate --noinput

echo "Criando superusuário padrão, se necessário..."
python manage.py create_default_superuser

if [ "$LOAD_INITIAL_DATA" = "True" ]; then
    echo "Executando carga inicial de dados..."
    python manage.py seed_initial_data
fi

echo "Iniciando servidor..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000}