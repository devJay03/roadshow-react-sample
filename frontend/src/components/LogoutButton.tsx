import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/utils";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
	const { logout, isLoading } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch (err: unknown) {
			console.error("Logout Failed", err);
		}
	};

	return (
		<button
			onClick={handleLogout}
			disabled={isLoading}
			className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50">
			<FiLogOut />
			<span>{isLoading ? "Logging Out..." : "Logout"}</span>
		</button>
	);
}
