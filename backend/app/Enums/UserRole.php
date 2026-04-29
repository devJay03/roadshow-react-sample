<?php
namespace App\Enums;

enum UserRole: int {
    case USER    = 2;
    case MANAGER = 1;
    case ADMIN   = 0;

    public function label()
    {
        return match ($this) {
            self::USER => 'user',
            self::ADMIN => 'admin',
            self::MANAGER => 'manager'
        };
    }

}