<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'sku',
        'name',
        'description',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function variant()
    {
        return $this->hasMany(Variant::class);
    }
}
