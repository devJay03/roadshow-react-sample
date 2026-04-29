<?php

namespace App\Services;

use App\Models\Category;

class CategoryServices
{
    public function store(array $data)
    {
        return Category::create($data);
    }

    public function update(array $data, Category $category)
    {
        $category->update($data);
        return $category->fresh();
    }

    public function delete(String $id)
    {
        $category     = Category::findOrFail($id);
        $categoryName = $category->category;
        $category->delete();
        return $categoryName;
    }
}
