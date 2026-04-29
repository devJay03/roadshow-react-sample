interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export const SearchBar = ({
	value,
	onChange,
	placeholder = "Search...",
}: SearchBarProps) => {
	return (
		<div className="md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-md border border-gray-200 dark:border-[#3d3d3d] p-4">
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="form-input rounded px-3 py-2 w-full md:w-80"
			/>
		</div>
	);
};
