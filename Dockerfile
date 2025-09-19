# Imagen base de PHP con extensiones necesarias
FROM php:8.2-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev libzip-dev zip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copiar proyecto
COPY . .

# Instalar dependencias PHP (producción)
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Instalar Node y compilar assets
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm ci \
    && npm run build

# Cachear configuración de Laravel
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Dar permisos a storage y cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Exponer puerto (Railway usará la variable PORT)
EXPOSE 8080

# Ejecutar Laravel en el puerto que defina Railway
CMD php artisan serve --host=0.0.0.0 --port=${PORT}
