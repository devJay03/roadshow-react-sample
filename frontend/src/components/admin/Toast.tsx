import { useEffect, useState } from "react";
import {
	FiCheckCircle,
	FiXCircle,
	FiAlertTriangle,
	FiInfo,
	FiX,
} from "react-icons/fi";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
	id: string;
	type: ToastType;
	title: string;
	message: string;
	duration?: number;
	onClose: (id: string) => void;
}

const toastIcons = {
	success: FiCheckCircle,
	error: FiXCircle,
	warning: FiAlertTriangle,
	info: FiInfo,
};

const toastStyles = {
	success:
		"bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
	error:
		"bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
	warning:
		"bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
	info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
};

const iconStyles = {
	success: "text-green-500 dark:text-green-400",
	error: "text-red-500 dark:text-red-400",
	warning: "text-yellow-500 dark:text-yellow-400",
	info: "text-blue-500 dark:text-blue-400",
};

export const Toast = ({
	id,
	type,
	title,
	message,
	duration = 5000,
	onClose,
}: ToastProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isExiting, setIsExiting] = useState(false);

	const Icon = toastIcons[type];

	useEffect(() => {
		requestAnimationFrame(() => {
			setIsVisible(true);
		});

		const timer = setTimeout(() => {
			handleClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	const handleClose = () => {
		setIsExiting(true);
		setTimeout(() => {
			onClose(id);
		}, 300);
	};

	return (
		<div
			className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ease-out transform ${
				isVisible && !isExiting
					? "translate-x-0 opacity-100 scale-100"
					: "translate-x-full opacity-0 scale-95"
			}`}>
			<div className={`border rounded-lg shadow-lg p-4 ${toastStyles[type]}`}>
				<div className="flex items-start">
					<div className="flex-shrink-0">
						<Icon className={`h-5 w-5 ${iconStyles[type]}`} />
					</div>
					<div className="ml-3 flex-1">
						<h4 className="text-sm font-semibold">{title}</h4>
						<p className="text-sm mt-1 opacity-90">{message}</p>
					</div>
					<div className="ml-4 flex-shrink-0">
						<button
							onClick={handleClose}
							className="inline-flex rounded-md p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
							<FiX className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export interface ToastData {
	id: string;
	type: ToastType;
	title: string;
	message: string;
	duration?: number;
}

interface ToastContainerProps {
	toasts: ToastData[];
	onRemoveToast: (id: string) => void;
}

export const ToastContainer = ({
	toasts,
	onRemoveToast,
}: ToastContainerProps) => {
	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} onClose={onRemoveToast} />
			))}
		</div>
	);
};
