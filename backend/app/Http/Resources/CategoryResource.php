<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    protected $filters;

    public function __construct($resource, $filters = [])
    {
        parent::__construct($resource);
        $this->filters = $filters;
    }

    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'type'      => $this->type->label(),
            'category'  => $this->category,
            'materials' => $this->whenLoaded('materials'),
            'products'  => $this->whenLoaded('products'),
            'created_at' => $this->created_at->format('F j, Y h:i A'),
        ];
    }
}
