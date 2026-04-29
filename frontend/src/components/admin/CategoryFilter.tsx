import { FiTag, FiPackage, FiCoffee, FiTool } from "react-icons/fi";
import { MdKitchen } from "react-icons/md";

export type CategoryFilterType =
	| "all"
	| "products"
	| "kitchen"
	| "barista"
	| "materials";

interface CategoryFilterProps {
	activeFilter: CategoryFilterType;
	onFilterChange: (filter: CategoryFilterType) => void;
	categoryCounts?: {
		all: number;
		products: number;
		kitchen: number;
		barista: number;
		materials: number;
	};
}

export const CategoryFilter = ({
	activeFilter,
	onFilterChange,
	categoryCounts,
}: CategoryFilterProps) => {
	const filters = [
		{
			id: "all" as CategoryFilterType,
			label: "All Categories",
			icon: FiTag,
			count: categoryCounts?.all || 0,
		},
		{
			id: "products" as CategoryFilterType,
			label: "Products",
			icon: FiPackage,
			count: categoryCounts?.products || 0,
		},
		{
			id: "kitchen" as CategoryFilterType,
			label: "Kitchen",
			icon: MdKitchen,
			count: categoryCounts?.kitchen || 0,
		},
		{
			id: "barista" as CategoryFilterType,
			label: "Barista",
			icon: FiCoffee,
			count: categoryCounts?.barista || 0,
		},
		{
			id: "materials" as CategoryFilterType,
			label: "Materials",
			icon: FiTool,
			count: categoryCounts?.materials || 0,
		},
	];

	return (
		<div className="md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-md p-4">
			<h3 className="text-sm font-medium text-gray-700 dark:text-[#a3a3a3] mb-3">
				Filter by Category Type
			</h3>
			<div className="flex flex-wrap gap-2">
				{filters.map((filter) => {
					const Icon = filter.icon;
					const isActive = activeFilter === filter.id;

					return (
						<button
							key={filter.id}
							onClick={() => onFilterChange(filter.id)}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
								isActive
									? "bg-[#10b981] text-white shadow-md"
									: "bg-gray-100 dark:bg-[#3d3d3d] text-gray-700 dark:text-[#a3a3a3] hover:bg-gray-200 dark:hover:bg-[#4d4d4d]"
							}`}>
							<Icon className="w-4 h-4" />
							<span>{filter.label}</span>
							{categoryCounts && (
								<span
									className={`px-2 py-0.5 text-xs rounded-full ${
										isActive
											? "bg-white/20 text-white"
											: "bg-gray-200 dark:bg-[#2d2d2d] text-gray-600 dark:text-[#a3a3a3]"
									}`}>
									{filter.count}
								</span>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};
