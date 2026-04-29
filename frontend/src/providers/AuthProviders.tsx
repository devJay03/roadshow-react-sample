import { AxiosError } from "axios";
import { useState, useEffect, type ReactNode } from "react";
import { LoginServices, LogoutServices } from "../services/AuthServices";
import { setAuthToken } from "../utils/utils";
import { AuthContext } from "../contexts/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const tokenEffect = async () => {
			try {
				const token = localStorage.getItem("authToken");
				if (token) {
					setAuthToken(token);
					setIsLoggedIn(true);
				}
				setIsLoading(false);
			} catch (err: unknown) {
				console.error("Error fetching token", err);
			}
		};
		tokenEffect();
	}, []);

	const login = async (formData: { email: string; password: string }) => {
		setError(null);
		setIsLoading(true);
		try {
			const response = await LoginServices(formData);
			if (response.token) {
				localStorage.setItem("authToken", response.token);
				setAuthToken(response.token);
				setIsLoggedIn(true);
			}
		} catch (err: unknown) {
			const axiosError = err as AxiosError<{ message?: string }>;
			setError(
				axiosError.response?.data?.message ||
				"Login failed. Please check your credentials."
			);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		try {
			await LogoutServices();
		} catch (err) {
			console.error("Logout failed:", err);
		} finally {
			console.log("Attempting to remove authToken from localStorage...");
			localStorage.removeItem("authToken");
			setAuthToken(null);
			setIsLoggedIn(false);
			setIsLoading(false);
			console.log("AuthToken removed.");
		}
	};

	const value = {
		isLoggedIn,
		login,
		logout,
		isLoading,
		error,
	};

	return (
		<AuthContext.Provider value={value}>
			{isLoading ? <FullScreenAppLoader /> : children}
		</AuthContext.Provider>
	);
};

function FullScreenAppLoader() {
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "12px",
				background: "#1a1a1a",
				color: "#e5e5e5",
				zIndex: 9998,
			}}
			aria-live="polite"
			aria-busy="true">
			<img
				src="/medyo-system-logo.jpg"
				alt="Medyo System"
				style={{
					width: 56,
					height: 56,
					borderRadius: 9999,
					objectFit: "cover",
				}}
			/>
			<div
				role="status"
				aria-label="Loading"
				style={{
					width: 28,
					height: 28,
					border: "3px solid rgba(16,185,129,0.35)",
					borderTopColor: "transparent",
					borderRadius: 9999,
					animation: "spin 0.8s linear infinite",
				}}
			/>

			<style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
		</div>
	);
}
