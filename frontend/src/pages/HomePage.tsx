import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import MedyoPattern from "../components/MedyoPattern";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/utils";

export default function HomePage() {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const login = async () => {
			if (isLoggedIn) navigate("/admin/dashboard");
		};
		login();
	}, [isLoggedIn, navigate]);

	// const handleLoginSuccess = () => {
	// 	navigate("/admin/dashboard");
	// };

	return (
		<div className="split-layout">
			<div className="pattern-side">
				<MedyoPattern />
			</div>

			<div className="form-side box-shadow-lg">
				<div className="form-container ">
					<div className="flex items-center justify-center mb-8">
						<img
							src="/medyo-system-logo.jpg"
							alt="Medyo System Logo"
							className="h-16 w-auto rounded-lg"
						/>
					</div>

					<h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
						Medyo System
					</h1>
					<>
						<h2 className="text-2xl font-semibold text-center text-gray-200 mb-4">
							Login
						</h2>
						<LoginForm onLoginSuccess={() => {}} />
					</>
				</div>
			</div>
		</div>
	);
}
