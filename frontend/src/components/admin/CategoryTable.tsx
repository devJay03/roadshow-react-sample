import { FiEdit, FiTrash2 } from "react-icons/fi";

export interface Category {
	id: number;
	category: string;
	type: string;
	created_at: string;
}

interface CategoryTableProps {
	categories: Category[];
	isRefreshing: boolean;
	isMutating: boolean;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
	pressedButton: { type: "edit" | "delete"; id: number } | null;
	animatingRowId: number | null;
	lastCreatedId: number | null;
	updatedRowId: number | null;
}

export const CategoryTable = ({
	categories,
	isRefreshing,
	isMutating,
	onEdit,
	onDelete,
	pressedButton,
	animatingRowId,
	lastCreatedId,
	updatedRowId,
}: CategoryTableProps) => {
	return (
		<div className="md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-md overflow-hidden relative">
			{(isRefreshing || isMutating) && (
				<div className="absolute inset-x-0 top-0 h-1 bg-[#10b981]/20 overflow-hidden">
					<div className="h-full bg-[#10b981] animate-[progress_1s_ease_infinite]"></div>
					<style>{`@keyframes progress { 0%{ transform: translateX(-100%) } 50%{ transform: translateX(0%) } 100%{ transform: translateX(100%) } }`}</style>
				</div>
			)}
			<div className="md:overflow-x-auto">
				<table className="min-w-full md:divide-y md:divide-gray-200 md:dark:divide-[#3d3d3d]">
					<thead className="hidden md:table-header-group">
						<tr className="bg-gray-50 dark:bg-[#3d3d3d]/50">
							<th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
								Category
							</th>
							<th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
								Type
							</th>
							<th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
								Date Created
							</th>
							<th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="md:table-row-group">
						{categories.map((cat) => (
							<tr
								key={cat.id}
								className={`bg-white dark:bg-[#2d2d2d] md:bg-transparent md:dark:bg-transparent border-b md:border-0 border-gray-200 dark:border-[#3d3d3d] hover:bg-gray-50 dark:hover:bg-[#3d3d3d]/50 transition duration-150 ease-in-out md:table-row ${
									animatingRowId === cat.id
										? "row-exit"
										: lastCreatedId === cat.id
										? "row-created"
										: updatedRowId === cat.id
										? "row-updated"
										: ""
								}`}>
								<td className="py-3 px-6 text-left text-sm font-medium text-gray-900 dark:text-[#e5e5e5]">
									{cat.category}
								</td>
								<td className="py-3 px-6 text-left text-sm text-gray-500 dark:text-[#a3a3a3]">
									<span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-[#10b981]/20 dark:text-[#10b981]">
										{cat.type}
									</span>
								</td>
								<td className="py-3 px-6 text-left text-sm text-gray-500 dark:text-[#a3a3a3]">
									{cat.created_at}
								</td>
								<td className="py-3 px-6 text-left text-sm">
									<div className="flex items-center space-x-4">
										<button
											onClick={() => onEdit(cat.id)}
											className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-indigo-600 dark:text-[#10b981] transition-all duration-200 ease-out hover:scale-110 active:scale-95 pressable ${
												pressedButton?.type === "edit" &&
												pressedButton.id === cat.id
													? "is-pressed"
													: ""
											}`}
											aria-label="Edit"
											title="Edit">
											<FiEdit />
										</button>
										<button
											onClick={() => onDelete(cat.id)}
											className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-red-600 dark:text-[#dc2626] transition-all duration-200 ease-out hover:scale-110 active:scale-95 pressable ${
												pressedButton?.type === "delete" &&
												pressedButton.id === cat.id
													? "is-pressed"
													: ""
											}`}
											aria-label="Delete"
											title="Delete">
											<FiTrash2 />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
