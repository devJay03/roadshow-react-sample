<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleVariant extends Model
{
    protected $fillable = [
        'variant_id',
        'quantity',
        'sub'
    ];
}
