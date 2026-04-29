<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'category_id',
        'raw',
        'type',
        'description',
        'unit',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function variants()
    {
        return $this->belongsToMany(Variant::class, 'varaint_materials');
    }
}
