<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategory;
use App\Http\Requests\Category\UpdateCategory;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\CategoryServices;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{

    protected $service;

    public function __construct(CategoryServices $services)
    {
        $this->service = $services;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoryResource::collection(Category::orderBy('category')->paginate(15))
            ->response()
            ->setStatusCode(200);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategory $request)
    {
        $data = $request->validated();
        try {
            $category = $this->service->store($data);
            return response()->json([
                'message' => "{$category->category} category under {$category->type->label()} type was added successfully!",
                'data'    => new CategoryResource($category),
            ], 200);
        } catch (\Throwable $e) {
            Log::error($e);
            return response()->json(['message' => 'Unable to add category. Please try again later! '], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $category->load('products', 'materials');

        return response()->json([
            'data' => new CategoryResource($category),
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategory $request, Category $category)
    {
        $data = $request->validated();
        try {
            $category = $this->service->update($data, $category);
            return response()->json([
                'message' => "{$category->category} has been updated successfully!",
                'data'    => new CategoryResource($category),
            ], 200);
        } catch (\Throwable $e) {
            Log::error($e);
            return response()->json(['message' => 'Unable to update category: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $category = $this->service->delete($id);
            return response()->json([
                'message' => "{$category} was deleted successfully!",
            ], 200);
        } catch (\Throwable $e) {
            Log::error($e);
            return response()->json(['message' => 'Unable to delete category. Please try again later.'], 500);
        }
    }
}
