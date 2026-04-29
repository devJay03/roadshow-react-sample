import axios from "axios";

axios.defaults.headers.common["Accept"] = "application/json";
export const setAuthToken = (token: string | null) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

interface LoginResponse {
	message: string;
	token: string;
}
export const LoginServices = async (formData: {
	email: string;
	password: string;
}): Promise<LoginResponse> => {
	const response = await axios.post(`login`, formData);
	return response.data;
};
export const LogoutServices = async () => {
	await axios.post(`logout`);
};
