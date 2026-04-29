import React, { Component, type ReactNode } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
	errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		this.setState({ error, errorInfo });
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined });
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen flex items-center justify-center p-6 dark:bg-[#1a1a1a]">
					<div className="max-w-md w-full bg-white dark:bg-[#2d2d2d] rounded-xl shadow-xl border border-gray-200 dark:border-[#3d3d3d] p-6 text-center">
						<div className="mb-4">
							<FiAlertTriangle className="mx-auto h-12 w-12 text-red-500" />
						</div>
						<h2 className="text-xl font-semibold text-gray-800 dark:text-[#e5e5e5] mb-2">
							Something went wrong
						</h2>
						<p className="text-sm text-gray-600 dark:text-[#a3a3a3] mb-6">
							An unexpected error occurred. Please try refreshing the page.
						</p>
						<button
							onClick={this.handleRetry}
							className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg hover:bg-[#10b981]/90 transition-colors">
							<FiRefreshCw className="h-4 w-4" />
							Refresh Page
						</button>
						{process.env.NODE_ENV === "development" && this.state.error && (
							<details className="mt-4 text-left">
								<summary className="cursor-pointer text-sm text-gray-500">
									Error Details (Development)
								</summary>
								<pre className="mt-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded overflow-auto">
									{this.state.error.toString()}
									{this.state.errorInfo?.componentStack}
								</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

interface InlineErrorProps {
	error: string | null;
	onDismiss?: () => void;
	showRetry?: boolean;
	onRetry?: () => void;
}

export const InlineError = ({
	error,
	onDismiss,
	showRetry,
	onRetry,
}: InlineErrorProps) => {
	if (!error) return null;

	return (
		<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
			<div className="flex items-start">
				<FiAlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
				<div className="ml-3 flex-1">
					<p className="text-sm text-red-800 dark:text-red-200">{error}</p>
					{(showRetry || onDismiss) && (
						<div className="mt-3 flex gap-2">
							{showRetry && onRetry && (
								<button
									onClick={onRetry}
									className="text-xs bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-200 px-3 py-1 rounded hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors">
									Try Again
								</button>
							)}
							{onDismiss && (
								<button
									onClick={onDismiss}
									className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors">
									Dismiss
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
