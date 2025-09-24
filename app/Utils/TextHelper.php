<?php

namespace App\Utils;

class TextHelper
{
    public static function toUpper(?string $value ): ?string
    {
        return $value !== null ? mb_strtoupper($value, 'UTF-8') : null;
    }
}