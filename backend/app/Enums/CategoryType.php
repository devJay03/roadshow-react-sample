<?php

namespace App\Enums;

enum CategoryType: int
{
    case PRODUCT  = 0;
    case KITCHEN  = 1;
    case BARISTA  = 2;
    case MATERIAL = 3;

    public function label()
    {
        return match ($this) {
            self::PRODUCT => 'Product',
            self::KITCHEN => 'Kitchen',
            self::BARISTA => 'Barista',
            self::MATERIAL => 'Material'
        };
    }
}
