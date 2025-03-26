export function useGenerateDistinctColor() {
	function generateDistinctBlues(count: number) {
		// Wider hue range from navy to teal (220 to 180 degrees)
		const hueStart = 220;
		const hueEnd = 180;

		// More dramatic lightness variation
		const lightnessStart = 15; // Very dark
		const lightnessEnd = 85; // Very light

		// Saturation will peak in middle colors
		const maxSaturation = 85;

		return Array.from({ length: count }, (_, i) => {
			const ratio = i / (count - 1);

			// Hue moves from blue toward teal
			const hue = hueStart + (hueEnd - hueStart) * ratio;

			// Lightness curve - accelerates in middle
			const lightness =
				lightnessStart + (lightnessEnd - lightnessStart) * ratio ** 0.7;

			// Saturation peaks in the middle colors
			const saturation = maxSaturation * (1 - (2 * ratio - 1) ** 2);

			return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		});
	}

	const distinctColors = generateDistinctBlues(10).reverse().slice(3);

	return { distinctColors };
}
