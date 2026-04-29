import { useState } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { type CategoryFormData } from "../../services/admin/CategoryServices";

interface CategoryFormProps {
	onSubmit: (data: CategoryFormData) => void;
	initialData?: { id: number; type: number; category: string };
	submitting?: boolean;
}

export const CategoryForm = ({
	onSubmit,
	initialData,
	submitting = false,
}: CategoryFormProps) => {
	const [formData, setFormData] = useState<CategoryFormData>(
		initialData || { type: 0, category: "" }
	);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((oldFormData) => ({
			...oldFormData,
			[name]: name === "type" ? parseInt(value) : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mb-6 p-6 md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-md border border-gray-200 dark:border-[#3d3d3d]">
			<h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-[#e5e5e5]">
				{initialData ? "Edit Category" : "Create New Category"}
			</h2>
			<div className="flex flex-col md:flex-row gap-4">
				<select
					name="type"
					value={formData.type}
					onChange={handleChange}
					className="form-input rounded px-3 py-2 flex-1">
					<option value={0}>Product</option>
					<option value={1}>Kitchen</option>
					<option value={2}>Barista</option>
					<option value={3}>Material</option>
				</select>
				<label htmlFor="category" className="sr-only">
					Category
				</label>
				<input
					type="text"
					name="category"
					id="category"
					value={formData.category}
					onChange={handleChange}
					placeholder="Category Name"
					className="form-input rounded px-3 py-2 flex-1"
				/>
				<button
					className="form-button px-4 py-2 rounded-lg inline-flex items-center gap-2 disabled:opacity-60 transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
					disabled={submitting}>
					{initialData ? (
						<>
							<FiEdit />
							<span>{submitting ? "Updating..." : "Update"}</span>
						</>
					) : (
						<>
							<FiPlus />
							<span>{submitting ? "Creating..." : "Create"}</span>
						</>
					)}
				</button>
			</div>
		</form>
	);
};
