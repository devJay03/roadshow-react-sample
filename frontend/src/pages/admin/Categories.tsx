import { useMemo, useState } from "react";
import { useCategories } from "../../hooks/admin/CategoryHooks";
import { useToast } from "../../hooks/admin/useToast";
import { type CategoryFormData } from "../../services/admin/CategoryServices";
import { FiTag } from "react-icons/fi";
import {
	CategoryForm,
	CategoryFilter,
	SearchBar,
	CategoryTable,
	Pagination,
	EditCategoryModal,
	DeleteConfirmModal,
	ToastContainer,
	InlineError,
	type CategoryFilterType,
} from "../../components/admin";
export default function Categories() {
	const {
		categories,
		isLoading,
		isRefreshing,
		isMutating,
		lastCreatedId,
		clearLastCreatedId,
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
	} = useCategories();

	const { toasts, removeToast, success, error: showError } = useToast();
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
	const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
	const [pressedButton, setPressedButton] = useState<{
		type: "edit" | "delete";
		id: number;
	} | null>(null);
	const [animatingRowId, setAnimatingRowId] = useState<number | null>(null);
	const [updatedRowId, setUpdatedRowId] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilter, setActiveFilter] = useState<CategoryFilterType>("all");

	const handleUpdateSubmit = async (formData: CategoryFormData) => {
		if (editingCategory) {
			const result = await handleUpdate(editingCategory.id, formData);
			if (result) {
				setUpdatedRowId(editingCategory.id);
				setTimeout(() => setUpdatedRowId(null), 1200);
				stopEditing();
				setIsEditModalOpen(false);
				success("Category Updated", "Category has been successfully updated.");
			} else if (error) {
				showError("Update Failed", error.message);
			}
		}
	};

	const openEdit = async (id: number) => {
		setPressedButton({ type: "edit", id });
		setTimeout(() => setPressedButton(null), 220);
		await startEditing(id);
		setIsEditModalOpen(true);
	};

	const openDeleteConfirm = (id: number) => {
		setPressedButton({ type: "delete", id });
		setTimeout(() => setPressedButton(null), 220);
		setPendingDeleteId(id);
		setIsDeleteConfirmOpen(true);
	};

	const confirmDelete = async () => {
		if (pendingDeleteId != null) {
			setAnimatingRowId(pendingDeleteId);
			await new Promise((r) => setTimeout(r, 260));
			const result = await handleDelete(pendingDeleteId);
			setAnimatingRowId(null);

			if (result) {
				success("Category Deleted", "Category has been successfully deleted.");
			} else if (error) {
				showError("Delete Failed", error.message);
			}
		}
		setIsDeleteConfirmOpen(false);
		setPendingDeleteId(null);
	};

	const filteredCategories = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		const categoriesArray = categories ?? [];
		const sortedCategories = [...categoriesArray].sort((a, b) => {
			const dateA = new Date(a.created_at).getTime();
			const dateB = new Date(b.created_at).getTime();
			return dateB - dateA;
		});

		let typeFilteredCategories = sortedCategories;
		if (activeFilter !== "all") {
			const filterTypeMap = {
				products: "Product",
				kitchen: "Kitchen",
				barista: "Barista",
				materials: "Material",
			};
			typeFilteredCategories = sortedCategories.filter(
				(c) =>
					c.type?.toLowerCase() === filterTypeMap[activeFilter]?.toLowerCase()
			);
		}

		if (!query) return typeFilteredCategories;

		return typeFilteredCategories.filter(
			(c) =>
				c.category.toLowerCase().includes(query) ||
				(c.type || "").toString().toLowerCase().includes(query)
		);
	}, [categories, searchQuery, activeFilter]);

	const categoryCounts = useMemo(() => {
		const categoriesArray = categories ?? [];
		return {
			all: categoriesArray.length,
			products: categoriesArray.filter(
				(c) => c.type?.toLowerCase() === "product"
			).length,
			kitchen: categoriesArray.filter(
				(c) => c.type?.toLowerCase() === "kitchen"
			).length,
			barista: categoriesArray.filter(
				(c) => c.type?.toLowerCase() === "barista"
			).length,
			materials: categoriesArray.filter(
				(c) => c.type?.toLowerCase() === "material"
			).length,
		};
	}, [categories]);
	if (isLoading)
		return (
			<div className="p-6 space-y-6 dark:bg-[#1a1a1a]">
				<div className="md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-md p-6 text-center text-gray-800 dark:text-[#e5e5e5]">
					Loading...
				</div>
			</div>
		);
	if (error && isLoading)
		return (
			<div className="p-6 space-y-6 dark:bg-[#1a1a1a]">
				<InlineError
					error={error.message}
					onDismiss={clearError}
					showRetry={true}
					onRetry={retryFetch}
				/>
			</div>
		);

	return (
		<div className="p-6 space-y-6 dark:bg-[#1a1a1a]">
			<ToastContainer toasts={toasts} onRemoveToast={removeToast} />

			<h1 className="text-3xl font-bold text-gray-800 dark:text-[#e5e5e5] mb-2 flex items-center gap-2">
				<FiTag className="text-[#10b981]" />
				<span>Category Management</span>
			</h1>

			{error && !isLoading && (
				<InlineError
					error={error.message}
					onDismiss={clearError}
					showRetry={true}
					onRetry={retryFetch}
				/>
			)}

			<CategoryForm
				onSubmit={async (fd) => {
					const ok = await handleCreate(fd);
					if (ok) {
						setTimeout(() => clearLastCreatedId(), 1200);
						success(
							"Category Created",
							"New category has been successfully created."
						);
					} else if (error) {
						showError("Creation Failed", error.message);
					}
				}}
				submitting={isMutating}
			/>

			<CategoryFilter
				activeFilter={activeFilter}
				onFilterChange={setActiveFilter}
				categoryCounts={categoryCounts}
			/>

			<SearchBar
				value={searchQuery}
				onChange={setSearchQuery}
				placeholder="Search categories or type..."
			/>

			<CategoryTable
				categories={filteredCategories}
				isRefreshing={isRefreshing}
				isMutating={isMutating}
				onEdit={openEdit}
				onDelete={openDeleteConfirm}
				pressedButton={pressedButton}
				animatingRowId={animatingRowId}
				lastCreatedId={lastCreatedId}
				updatedRowId={updatedRowId}
			/>

			<Pagination
				currentPage={currentPage}
				lastPage={lastPage}
				onPageChange={setCurrentPage}
			/>

			<EditCategoryModal
				isOpen={isEditModalOpen}
				onClose={() => {
					setIsEditModalOpen(false);
					stopEditing();
				}}
				onSubmit={handleUpdateSubmit}
				editingCategory={editingCategory}
				isMutating={isMutating}
			/>

			<DeleteConfirmModal
				isOpen={isDeleteConfirmOpen}
				onClose={() => setIsDeleteConfirmOpen(false)}
				onConfirm={confirmDelete}
				isDeleting={isMutating}
				title="Delete category?"
				message="This action cannot be undone."
			/>
		</div>
	);
}
