import axios, { AxiosError } from "axios";

interface Employee {
	id: number;
	name: string;
	email: string;
	role: string;
	created_at: string;
}

export const EmployeeServices = async (): Promise<Employee[]> => {
	try {
		const response = await axios.get<{ data: Employee[] }>(`users`);
		return response.data.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const error = err as AxiosError<{ message?: string }>;
			throw new Error(
				error.response?.data?.message || "Failed to fetch Employees."
			);
		} else {
			throw err;
		}
	}
};
