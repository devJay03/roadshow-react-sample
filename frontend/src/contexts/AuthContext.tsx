import { createContext } from "react";

interface AuthContextType {
	isLoggedIn: boolean;
	login: (formData: { email: string; password: string }) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
	error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
