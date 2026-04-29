import { FiPlus, FiEdit, FiTrash2, FiUsers } from "react-icons/fi";
import { EmployeeHooks } from "../../hooks/admin/EmployeeHooks";

const SkeletonRow = () => (
	<div className="md:table-row bg-white dark:bg-[#2d2d2d] rounded-lg shadow-md md:shadow-none mb-4 md:mb-0">
		<div className="md:table-cell px-6 py-4 whitespace-nowrap">
			<div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
		</div>
		<div className="md:table-cell px-6 py-4 whitespace-nowrap">
			<div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
		</div>
		<div className="md:table-cell px-6 py-4 whitespace-nowrap">
			<div className="animate-pulse h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
		</div>
		<div className="md:table-cell px-6 py-4 whitespace-nowrap">
			<div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
		</div>
		<div className="md:table-cell px-6 py-4 whitespace-nowrap">
			<div className="flex items-center space-x-4">
				<div className="animate-pulse h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
				<div className="animate-pulse h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
			</div>
		</div>
	</div>
);

const Tooltip = ({
	text,
	children,
}: {
	text: string;
	children: React.ReactNode;
}) => (
	<div className="relative group">
		{children}
		<div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
			{text}
		</div>
	</div>
);

export default function EmployeeManagement() {
	const { employees, isLoading, error } = EmployeeHooks();

	if (isLoading) {
		return (
			<div className="p-6 space-y-6 dark:bg-[#1a1a1a]">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-800 dark:text-[#e5e5e5] flex items-center gap-2">
						<FiUsers className="text-[#10b981]" />
						<span>Employee Management</span>
					</h1>
					<button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-[#10b981] dark:hover:bg-[#059669] text-white px-4 py-2 rounded-lg transition duration-150 ease-in-out shadow-sm">
						<FiPlus />
						<span className="hidden md:inline">Add Employee</span>
					</button>
				</div>
				<div className="md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-md overflow-hidden">
					<div className="md:overflow-x-auto">
						<div className="md:table min-w-full md:divide-y md:divide-gray-200 md:dark:divide-[#3d3d3d]">
							<div className="hidden md:table-header-group">
								<div className="md:table-row bg-gray-50 dark:bg-[#3d3d3d]/50">
									<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
										Name
									</div>
									<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
										Email
									</div>
									<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
										Role
									</div>
									<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
										Employed Since
									</div>
									<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
										Actions
									</div>
								</div>
							</div>
							<div className="md:table-row-group">
								{[...Array(5)].map((_, i) => (
									<SkeletonRow key={i} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else if (error) {
		return (
			<div className="bg-red-50 dark:bg-[#7f1d1d] text-red-600 dark:text-[#fecaca] p-4 rounded-lg shadow-sm text-center">
				Error: {error}
			</div>
		);
	} else if (!employees || employees.length === 0) {
		return (
			<div className="bg-gray-50 dark:bg-[#2d2d2d] text-gray-600 dark:text-[#a3a3a3] p-8 rounded-lg shadow-sm text-center">
				No Employees Found.
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6 dark:bg-[#1a1a1a]">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold text-gray-800 dark:text-[#e5e5e5] flex items-center gap-2">
					<FiUsers className="text-[#10b981]" />
					<span>Employee Management</span>
				</h1>
				<button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-[#10b981] dark:hover:bg-[#059669] text-white px-4 py-2 rounded-lg transition duration-150 ease-in-out shadow-sm">
					<FiPlus />
					<span className="hidden md:inline">Add Employee</span>
				</button>
			</div>

			<div className="md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-md overflow-hidden">
				<div className="md:overflow-x-auto">
					<div className="md:table min-w-full md:divide-y md:divide-gray-200 md:dark:divide-[#3d3d3d]">
						<div className="hidden md:table-header-group">
							<div className="md:table-row bg-gray-50 dark:bg-[#3d3d3d]/50">
								<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
									Name
								</div>
								<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
									Email
								</div>
								<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
									Role
								</div>
								<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
									Employed Since
								</div>
								<div className="md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#a3a3a3] uppercase tracking-wider">
									Actions
								</div>
							</div>
						</div>
						<div className="md:table-row-group">
							{employees.map((employee) => (
								<div
									key={employee.id}
									className="bg-white dark:bg-[#2d2d2d] rounded-lg shadow-md md:shadow-none mb-4 md:mb-0 md:table-row hover:bg-gray-50 dark:hover:bg-[#3d3d3d]/50 transition duration-150 ease-in-out">
									<div className="md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-[#e5e5e5]">
										<span className="md:hidden font-bold">Name: </span>
										{employee.name}
									</div>
									<div className="md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-[#a3a3a3]">
										<span className="md:hidden font-bold">Email: </span>
										{employee.email}
									</div>
									<div className="md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-[#a3a3a3]">
										<span className="md:hidden font-bold">Role: </span>
										<span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-[#10b981]/20 dark:text-[#10b981]">
											{employee.role}
										</span>
									</div>
									<div className="md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-[#a3a3a3]">
										<span className="md:hidden font-bold">
											Employed Since:{" "}
										</span>
										{employee.created_at}
									</div>
									<div className="md:table-cell px-6 py-4 whitespace-nowrap text-sm">
										<div className="flex items-center space-x-4">
											<Tooltip text="Edit">
												<button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-indigo-600 dark:text-[#10b981] transition duration-150 ease-in-out">
													<FiEdit />
												</button>
											</Tooltip>
											<Tooltip text="Delete">
												<button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-red-600 dark:text-[#dc2626] transition duration-150 ease-in-out">
													<FiTrash2 />
												</button>
											</Tooltip>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
