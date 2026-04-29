interface PaginationProps {
	currentPage: number;
	lastPage: number;
	onPageChange: (page: number) => void;
}

export const Pagination = ({
	currentPage,
	lastPage,
	onPageChange,
}: PaginationProps) => {
	return (
		<div className="flex justify-center items-center gap-2">
			<button
				onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
				disabled={currentPage === 1}
				className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-[#3d3d3d] dark:text-[#e5e5e5] disabled:opacity-50">
				Previous
			</button>
			<span className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#2d2d2d] text-gray-700 dark:text-[#a3a3a3]">
				{currentPage} of {lastPage}
			</span>
			<button
				onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
				disabled={currentPage === lastPage}
				className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-[#3d3d3d] dark:text-[#e5e5e5] disabled:opacity-50">
				Next
			</button>
		</div>
	);
};
