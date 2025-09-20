#!/bin/sh

echo "Running migrations..."
php artisan migrate --force

echo "Starting Laravel..."
exec php artisan serve --host=0.0.0.0 --port=${PORT:-8080}

chmod +x docker/entrypoint.sh
