import { useEffect, useState } from "react";
import { useAuth } from "../utils/utils";
interface LoginFormData {
	email: string;
	password: string;
}

export const LoginHooks = (onSuccess: () => void) => {
	const { login, isLoading, error, isLoggedIn } = useAuth();
	const [loginError, setLoginError] = useState<string | null>(null);
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (isLoggedIn) {
			onSuccess();
		}
	}, [isLoggedIn, onSuccess]);

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = evt.target;
		setFormData((oldFormData) => ({ ...oldFormData, [name]: value }));
	};

	const handleSubmit = async (evt: React.FormEvent) => {
		evt.preventDefault();
		setLoginError(null);
		if (!formData.email || !formData.password) {
			setLoginError("All fields are required.");
			return;
		}
		try {
			await login({
				email: formData.email,
				password: formData.password,
			});
		} catch (err: unknown) {
			console.error(err);
			setLoginError(error);
		}
	};
	return { formData, handleChange, handleSubmit, error: loginError, isLoading };
};
