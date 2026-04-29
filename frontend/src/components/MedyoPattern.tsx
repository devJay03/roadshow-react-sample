export default function MedyoPattern() {
	const createMedyoPattern = () => {
		const pattern = [];
		const colors = ["white", "orange", "emerald"];
		const animations = ["float-1", "float-2"];

		for (let i = 0; i < 64; i++) {
			const colorIndex = Math.floor(Math.random() * colors.length);
			const animationIndex = Math.floor(Math.random() * animations.length);
			const delay = (Math.random() * 2).toFixed(2);
			const scale = 0.8 + Math.random() * 0.4;
			pattern.push(
				<span
					key={i}
					className={`medyo-text medyo-text-${colors[colorIndex]}`}
					style={{
						animation: `${animations[animationIndex]} ${
							2 + Math.random() * 2
						}s ease-in-out ${delay}s infinite`,
						transform: `scale(${scale})`,
						opacity: colors[colorIndex] === "white" ? 0.1 : 0.2,
					}}>
					medyo
				</span>
			);
		}
		return pattern;
	};

	return (
		<>
			<div className="medyo-pattern">{createMedyoPattern()}</div>
		</>
	);
}
