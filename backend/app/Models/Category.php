<?php
namespace App\Models;

use App\Enums\CategoryType;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'type',
        'category',
    ];

    protected function casts(): array
    {
        return [
            'type' => CategoryType::class,
        ];
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

}