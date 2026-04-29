export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-[#2d2d2d] text-gray-400 px-6 py-4 mt-auto text-center">
			<p className="text-sm">
				&copy; {currentYear} Medyo System. All Rights Reserved.
			</p>
		</footer>
	);
}
