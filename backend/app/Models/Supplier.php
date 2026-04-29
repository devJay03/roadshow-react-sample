<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'name',
        'number',
        'email',
        'region',
        'province',
        'city',
        'barangay',
        'postal_code',
    ];
}
