import { useState, useEffect, useCallback, useRef } from "react";
import {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	getCategory,
	type Category,
	type CategoryFormData,
	type CategoryError,
} from "../../services/admin/CategoryServices";

export const useCategories = () => {
	const [categories, setCategories] = useState<Category[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isMutating, setIsMutating] = useState(false);
	const [lastCreatedId, setLastCreatedId] = useState<number | null>(null);
	const [error, setError] = useState<CategoryError | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const isFirstLoadRef = useRef(true);

	const fetchingCategories = useCallback(
		async (
			page: number,
			{ showLoading = false }: { showLoading?: boolean } = {}
		) => {
			try {
				if (showLoading) {
					setIsLoading(true);
				} else {
					setIsRefreshing(true);
				}
				const response = await getCategories(page);
				if (response) {
					const { data, meta } = response;
					setCategories(data);
					setCurrentPage(meta.current_page);
					setLastPage(meta.last_page);
				} else {
					setCategories([]);
					setCurrentPage(1);
					setLastPage(1);
				}
			} catch (err) {
				setError(err as CategoryError);
			} finally {
				if (showLoading) {
					setIsLoading(false);
				} else {
					setIsRefreshing(false);
				}
			}
		},
		[]
	);

	useEffect(() => {
		const showLoading = isFirstLoadRef.current;
		fetchingCategories(currentPage, { showLoading });
		if (isFirstLoadRef.current) isFirstLoadRef.current = false;
	}, [fetchingCategories, currentPage]);

	const handleCreate = async (formData: CategoryFormData) => {
		try {
			setIsMutating(true);
			const resp = await createCategory({ formData });
			if (resp?.data?.id) {
				setLastCreatedId(resp.data.id);
			}

			await fetchingCategories(currentPage, { showLoading: false });
			return true;
		} catch (err) {
			setError(err as CategoryError);
			return false;
		} finally {
			setIsMutating(false);
		}
	};
	const handleUpdate = async (id: number, formData: CategoryFormData) => {
		try {
			setIsMutating(true);
			const updated = await updateCategory(id, formData);

			if (updated?.data) {
				setCategories((prev) =>
					(prev ?? []).map((c) => (c.id === id ? { ...c, ...updated.data } : c))
				);
			} else {
				await fetchingCategories(currentPage, { showLoading: false });
			}
			setEditingCategory(null);
			return true;
		} catch (err) {
			setError(err as CategoryError);
			return false;
		} finally {
			setIsMutating(false);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			setIsMutating(true);
			await deleteCategory({ id });

			setCategories((prev) => (prev ?? []).filter((c) => c.id !== id));

			await fetchingCategories(currentPage, { showLoading: false });
			return true;
		} catch (err) {
			setError(err as CategoryError);
			return false;
		} finally {
			setIsMutating(false);
		}
	};

	const startEditing = async (id: number) => {
		try {
			const response = await getCategory(id);
			const categoryToEdit = response?.data ?? null;
			setEditingCategory(categoryToEdit);
		} catch (err) {
			setError(err as CategoryError);
		}
	};

	const stopEditing = () => setEditingCategory(null);

	const clearError = () => setError(null);

	const retryFetch = () => {
		setError(null);
		fetchingCategories(currentPage, { showLoading: false });
	};

	return {
		categories,
		isLoading,
		isRefreshing,
		isMutating,
		lastCreatedId,
		clearLastCreatedId: () => setLastCreatedId(null),
		error,
		clearError,
		retryFetch,
		currentPage,
		lastPage,
		editingCategory,
		handleCreate,
		handleUpdate,
		handleDelete,
		startEditing,
		stopEditing,
		setCurrentPage,
	};
};
