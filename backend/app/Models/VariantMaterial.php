<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VariantMaterial extends Model
{
    protected $fillable = [
        'variant_id',
        'material_id',
    ];

    public function variant()
    {
        return $this->belongsTo(Variant::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
