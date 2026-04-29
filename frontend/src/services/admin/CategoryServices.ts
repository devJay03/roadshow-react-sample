import axios, { AxiosError } from "axios";

export interface Category {
	id: number;
	type: string;
	category: string;
	created_at: string;
}
export interface CategoryFormData {
	type: number;
	category: string;
}

export interface CategoryError {
	message: string;
	code?: string;
	field?: string;
}

const handleApiError = (error: unknown): CategoryError => {
	if (error instanceof AxiosError) {
		const errorMessage = error.response?.data?.message || error.message;
		const errorCode = error.response?.status?.toString() || error.code;
		switch (error.response?.status) {
			case 400:
				return {
					message: "Invalid data provided. Please check your input.",
					code: errorCode,
				};
			case 401:
				return {
					message: "You are not authorized to perform this action.",
					code: errorCode,
				};
			case 403:
				return {
					message: "Access denied. You don't have permission.",
					code: errorCode,
				};
			case 404:
				return { message: "Category not found.", code: errorCode };
			case 409:
				return { message: "Category already exists.", code: errorCode };
			case 422:
				return {
					message: errorMessage || "Validation failed. Please check your data.",
					code: errorCode,
					field: error.response?.data?.field,
				};
			case 500:
				return {
					message: "Server error. Please try again later.",
					code: errorCode,
				};
			default:
				return {
					message: errorMessage || "An unexpected error occurred.",
					code: errorCode,
				};
		}
	}

	return { message: "Network error. Please check your connection." };
};
export const getCategories = async (page: number = 1) => {
	try {
		const response = await axios.get<{
			data: Category[];
			meta: { last_page: number; current_page: number };
		}>(`categories?page=${page}`);
		return response.data;
	} catch (err) {
		console.error(err);
		throw handleApiError(err);
	}
};
export const getCategory = async (id: number) => {
	try {
		const response = await axios.get<{ data: Category }>(`categories/${id}`);
		return response.data;
	} catch (err) {
		console.error("Failed to get Category", err);
		throw handleApiError(err);
	}
};

export const createCategory = async ({
	formData,
}: {
	formData: CategoryFormData;
}) => {
	try {
		const response = await axios.post<{ message: string; data: Category }>(
			"categories",
			formData
		);
		return response.data;
	} catch (err) {
		console.error("Failed to create categories", err);
		throw handleApiError(err);
	}
};

export const updateCategory = async (
	id: number,
	formData: CategoryFormData
) => {
	try {
		const response = await axios.put<{ message: string; data: Category }>(
			`categories/${id}`,
			formData
		);
		return response.data;
	} catch (err) {
		console.error("Failed to update categories", err);
		throw handleApiError(err);
	}
};

export const deleteCategory = async ({ id }: { id: number }) => {
	try {
		const response = await axios.delete<{ message: string }>(
			`categories/${id}`
		);
		return response.data;
	} catch (err) {
		console.error("Failed to delete categories", err);
		throw handleApiError(err);
	}
};
