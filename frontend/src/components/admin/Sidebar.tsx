import { NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import { useAuth } from "../../utils/utils";
import {
	FiGrid,
	FiUsers,
	FiMenu,
	FiX,
	FiChevronDown,
	FiTag,
} from "react-icons/fi";
import { useState } from "react";

export default function Sidebar() {
	const { isLoggedIn } = useAuth();
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isEmployeeMenuOpen, setEmployeeMenuOpen] = useState(true);

	const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
	const toggleEmployeeMenu = () => setEmployeeMenuOpen(!isEmployeeMenuOpen);

	return (
		<>
			<button className="md:hidden p-4 text-white" onClick={toggleSidebar}>
				{isSidebarOpen ? <FiX /> : <FiMenu />}
			</button>
			<aside
				className={`bg-[#2d2d2d] text-white w-64 min-h-screen p-4 transition-transform transform border-r border-[#3d3d3d] ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 md:relative absolute z-20`}>
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-2xl font-bold text-emerald-400">Medyo</h1>
					<button className="md:hidden text-white" onClick={toggleSidebar}>
						<FiX />
					</button>
				</div>
				<nav>
					<ul className="space-y-2">
						<li>
							<NavLink
								to="/admin/dashboard"
								className={({ isActive }) =>
									`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
										isActive
											? "bg-emerald-500/20 text-emerald-400"
											: "hover:bg-gray-700/50 hover:text-white"
									}`
								}>
								<FiGrid />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/admin/categories"}
								className={({ isActive }) =>
									`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
										isActive
											? "bg-emerald-500/20 text-emerald-400"
											: "hover:bg-gray-700/50 hover:text-white"
									}`
								}>
								<FiTag />
								<span>Categories</span>
							</NavLink>
						</li>
						<li>
							<button
								onClick={toggleEmployeeMenu}
								className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700/50 hover:text-white">
								<div className="flex items-center gap-3">
									<FiUsers />
									<span>Employee Mgt</span>
								</div>
								<FiChevronDown
									className={`transition-transform ${
										isEmployeeMenuOpen ? "rotate-180" : ""
									}`}
								/>
							</button>
							{isEmployeeMenuOpen && (
								<ul className="pl-6 mt-2 space-y-2">
									<li>
										<NavLink
											to="/admin/employee-management"
											className={({ isActive }) =>
												`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
													isActive
														? "bg-emerald-500/20 text-emerald-400"
														: "hover:bg-gray-700/50 hover:text-white"
												}`
											}>
											<span>Employees</span>
										</NavLink>
									</li>
								</ul>
							)}
						</li>
					</ul>
				</nav>
				<div className="absolute bottom-4 left-4 right-4">
					{isLoggedIn && <LogoutButton />}
				</div>
			</aside>
		</>
	);
}
