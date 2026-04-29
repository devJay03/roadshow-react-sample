import { useEffect, useState } from "react";

interface DeleteConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isDeleting: boolean;
	title?: string;
	message?: string;
}

export const DeleteConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	isDeleting,
	title = "Delete item?",
	message = "This action cannot be undone.",
}: DeleteConfirmModalProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setIsAnimating(true);
				});
			});
		} else {
			setIsAnimating(false);
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const handleClose = () => {
		setIsAnimating(false);
		setTimeout(() => {
			onClose();
		}, 300);
	};

	const handleConfirm = () => {
		setIsAnimating(false);
		setTimeout(() => {
			onConfirm();
		}, 300);
	};

	if (!shouldRender) return null;

	return (
		<div
			className={`fixed inset-0 z-30 flex items-center justify-center transition-all duration-300 ease-out ${
				isAnimating ? "opacity-100" : "opacity-0"
			}`}>
			<div
				className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out ${
					isAnimating ? "opacity-100" : "opacity-0"
				}`}
				onClick={handleClose}
			/>
			<div
				className={`relative z-40 w-full max-w-md md:bg-white md:dark:bg-[#2d2d2d] rounded-xl md:shadow-2xl border border-gray-200 dark:border-[#3d3d3d] p-6 transition-all duration-300 ease-out transform ${
					isAnimating
						? "scale-100 opacity-100 translate-y-0"
						: "scale-90 opacity-0 translate-y-8"
				}`}>
				<h3 className="text-lg font-semibold text-gray-800 dark:text-[#e5e5e5] mb-2">
					{title}
				</h3>
				<p className="text-sm text-gray-600 dark:text-[#a3a3a3] mb-4">
					{message}
				</p>
				<div className="flex justify-end gap-3">
					<button
						className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-[#3d3d3d] dark:text-[#e5e5e5] transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-gray-300 dark:hover:bg-[#4d4d4d]"
						onClick={handleClose}>
						Cancel
					</button>
					<button
						className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-60 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-red-700 disabled:hover:scale-100 disabled:hover:bg-red-600"
						onClick={handleConfirm}
						disabled={isDeleting}>
						{isDeleting ? "Deleting..." : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
};
