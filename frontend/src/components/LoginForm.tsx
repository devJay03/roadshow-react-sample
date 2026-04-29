import { LoginHooks } from "../hooks/LoginHooks";
interface LoginFormProps {
	onLoginSuccess: () => void;
}
export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
	const { formData, handleChange, handleSubmit, error, isLoading } =
		LoginHooks(onLoginSuccess);
	return (
		<section className="space-y-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="login-email"
						className="block text-sm font-medium text-gray-300 mb-1">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="login-email"
						className="form-input mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label
						htmlFor="login-password"
						className="block text-sm font-medium text-gray-300 mb-1">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="login-password"
						className="form-input mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				{error && (
					<div className="error-message p-3 rounded" role="alert">
						<p>{error}</p>
					</div>
				)}
				<div>
					<button
						type="submit"
						className="form-button w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
						disabled={isLoading}>
						{isLoading ? "Logging in..." : "Login"}
					</button>
				</div>
			</form>
		</section>
	);
}
