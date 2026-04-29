import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import EmployeeManagement from "./pages/admin/EmployeeManagement.tsx";
import AdminLayout from "./pages/admin/layout/AdminLayout.tsx";
import { AuthProvider } from "./providers/AuthProviders.tsx";
import Categories from "./pages/admin/Categories.tsx";
import "./AxiosConfig.ts";

const router = createBrowserRouter([
	{ path: "/", element: <App /> },
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{ index: true, element: <Dashboard /> },
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "employee-management",
				element: <EmployeeManagement />,
			},
			{
				path: "categories",
				element: <Categories />,
			},
		],
	},
	{ path: "*", element: <PageNotFound /> },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>
);

const splash = document.getElementById("app-splash");
if (splash) {
	requestAnimationFrame(() => {
		splash.classList.add("fade-out");
		splash.addEventListener(
			"animationend",
			() => splash.parentElement?.removeChild(splash),
			{ once: true }
		);
	});
}
