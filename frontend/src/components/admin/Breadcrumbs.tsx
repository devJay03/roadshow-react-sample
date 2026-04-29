import { useLocation, Link } from "react-router";
export default function Breacrumbs() {
	const location = useLocation();
	const paths = location.pathname.split("/").filter(Boolean);
	return (
		<nav className="bg-[var(--secondary-dark)] px-4 py-2">
			<ul className="flex space-x2 text-sm">
				{paths.map((segment, index) => {
					const path = `/${paths.slice(0, index + 1).join("/")}`;
					return (
						<li key={index}>
							<Link
								to={path}
								className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] hover:underline">
								{segment}
							</Link>
							{index < paths.length - 1 && (
								<span className="mx-2 text-[var(--text-secondary)]">/</span>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
