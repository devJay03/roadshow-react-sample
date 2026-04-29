import { useEffect, useState } from "react";
import { FiEdit, FiX } from "react-icons/fi";
import { CategoryForm } from "./CategoryForm";
import { type CategoryFormData } from "../../services/admin/CategoryServices";

interface EditCategoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CategoryFormData) => void;
	editingCategory: { id: number; type: string; category: string } | null;
	isMutating: boolean;
}

const getRoleInteger = (type: string): number => {
	switch (type) {
		case "Product":
			return 0;
		case "Kitchen":
			return 1;
		case "Barista":
			return 2;
		case "Material":
			return 3;
		default:
			return 0;
	}
};

export const EditCategoryModal = ({
	isOpen,
	onClose,
	onSubmit,
	editingCategory,
	isMutating,
}: EditCategoryModalProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setIsAnimating(true);
				});
			});
		} else {
			setIsAnimating(false);
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const handleClose = () => {
		setIsAnimating(false);
		setTimeout(() => {
			onClose();
		}, 300);
	};

	if (!shouldRender || !editingCategory) return null;

	return (
		<div
			className={`fixed inset-0 z-30 flex items-center justify-center transition-all duration-300 ease-out ${
				isAnimating ? "opacity-100" : "opacity-0"
			}`}>
			<div
				className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out ${
					isAnimating ? "opacity-100" : "opacity-0"
				}`}
				onClick={handleClose}
			/>
			<div
				className={`relative z-40 w-full max-w-lg md:max-w-xl md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-2xl border border-gray-200 dark:border-[#3d3d3d] transition-all duration-300 ease-out transform ${
					isAnimating
						? "scale-100 opacity-100 translate-y-0"
						: "scale-95 opacity-0 translate-y-4"
				}`}>
				<div className="flex items-center justify-between px-6 pt-6">
					<h2 className="text-xl font-bold text-gray-800 dark:text-[#e5e5e5] flex items-center gap-2">
						<FiEdit className="text-[#10b981]" />
						<span>Edit Category</span>
					</h2>
					<button
						className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-[#a3a3a3] transition-all duration-200 hover:scale-110 active:scale-95"
						onClick={handleClose}
						aria-label="Close"
						title="Close">
						<FiX />
					</button>
				</div>
				<div className="px-6 pb-6">
					<CategoryForm
						onSubmit={onSubmit}
						initialData={{
							id: editingCategory.id,
							type: getRoleInteger(editingCategory.type),
							category: editingCategory.category,
						}}
						submitting={isMutating}
					/>
				</div>
			</div>
		</div>
	);
};
