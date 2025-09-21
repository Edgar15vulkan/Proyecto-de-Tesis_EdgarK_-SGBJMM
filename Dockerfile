# ===== 1. Imagen base de PHP con extensiones necesarias =====
FROM php:8.2-fpm

# Instala extensiones y herramientas necesarias
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    curl zip npm && \
    docker-php-ext-install pdo pdo_mysql zip gd mbstring bcmath

# ===== 2. Copiar código al contenedor =====
WORKDIR /var/www/html
COPY . .

# ===== 3. Composer install =====
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# ===== 4. Node.js / NPM build =====
RUN npm install
RUN npm run build

# ===== 5. Permisos y cache de Laravel =====
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN php artisan config:clear
RUN php artisan cache:clear
RUN php artisan route:clear
RUN php artisan view:clear

# ===== 6. Exponer puerto PHP-FPM =====
