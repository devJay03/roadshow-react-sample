import { useState, useEffect } from "react";
import { EmployeeServices } from "../../services/admin/EmployeeServices";
import { AxiosError } from "axios";

interface Employee {
	id: number;
	name: string;
	email: string;
	role: string;
	created_at: string;
}

export const EmployeeHooks = () => {
	const [employees, setEmployees] = useState<Employee[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const data = await EmployeeServices();
				setEmployees(data);
			} catch (err) {
				const error = err as AxiosError<{ message?: string }>;
				setError(error.response?.data?.message || "Failed to fetch Employees.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchEmployees();
	}, []);

	return { employees, isLoading, error };
};
