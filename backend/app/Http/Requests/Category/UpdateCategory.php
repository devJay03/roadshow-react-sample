<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @method \Illuminate\Routing\Route route(string $parameter = null)
 */
class UpdateCategory extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

    public function authorize(): bool
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type'     => ['required', 'integer', 'in:0,1,2,3'],
            'category' => [
                'sometimes',
                'required',
                Rule::unique('categories', 'category')->ignore($this->route('category')->id),
            ],
        ];
    }

    public function messages()
    {
        return [
            'type.required'   => 'The type field is required.',
            'type.in'         => 'The selected type is invalid. Allowed types are 0 (Product), 1 (Kitchen), and 2 (Materials/Raw Ingredients).',
            // 'category.required' => 'Please specify the category.',
            'category.unique' => 'Category must be unique',
        ];
    }
}
