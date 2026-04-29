import { useState, useCallback } from "react";
import { type ToastData } from "../../components/admin/Toast";

export const useToast = () => {
	const [toasts, setToasts] = useState<ToastData[]>([]);

	const addToast = useCallback((toast: Omit<ToastData, "id">) => {
		const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
		const newToast: ToastData = { ...toast, id };

		setToasts((prev) => [...prev, newToast]);

		return id;
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	const clearAllToasts = useCallback(() => {
		setToasts([]);
	}, []);

	const success = useCallback(
		(title: string, message: string, duration?: number) => {
			return addToast({ type: "success", title, message, duration });
		},
		[addToast]
	);

	const error = useCallback(
		(title: string, message: string, duration?: number) => {
			return addToast({ type: "error", title, message, duration });
		},
		[addToast]
	);

	const warning = useCallback(
		(title: string, message: string, duration?: number) => {
			return addToast({ type: "warning", title, message, duration });
		},
		[addToast]
	);

	const info = useCallback(
		(title: string, message: string, duration?: number) => {
			return addToast({ type: "info", title, message, duration });
		},
		[addToast]
	);

	return {
		toasts,
		addToast,
		removeToast,
		clearAllToasts,
		success,
		error,
		warning,
		info,
	};
};
