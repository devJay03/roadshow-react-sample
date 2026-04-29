import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar";
import Breadcrumbs from "../../../components/admin/Breadcrumbs";
import Footer from "../../../components/admin/Footer";

export default function AdminLayout() {
	return (
		<div className="flex h-screen bg-[var(--primary-dark)] text-[var(--text-primary)]">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Breadcrumbs />
				<main className="flex-1 p-4 overflow-y-auto bg-[var(--accent-dark)]">
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	);
}
