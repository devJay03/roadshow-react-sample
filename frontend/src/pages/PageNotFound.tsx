import { useNavigate } from "react-router";

export default function PageNotFound() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-black flex items-center justify-center px-4">
			<div className="max-w-lg w-full text-center">
				<div className="mb-12">
					<h1 className="text-9xl font-bold text-white animate-bounce opacity-90">
						404
					</h1>
					<div className="h-1.5 w-12 bg-white mx-auto my-6 rounded-full opacity-50"></div>
					<h2 className="text-3xl font-semibold text-white mb-4 opacity-90">
						Page Not Found
					</h2>
					<p className="text-gray-400 mb-8">
						Oops! The page you're looking for seems to have gone on vacation.
						Let's get you back to somewhere familiar.
					</p>
				</div>

				<button
					onClick={handleClick}
					className="px-6 py-3 bg-white text-black rounded-lg font-medium 
                   transition-all duration-200 transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                   shadow-lg hover:bg-opacity-90 cursor-pointer">
					Return to Home Page
				</button>
			</div>
		</div>
	);
}
