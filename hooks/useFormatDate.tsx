export function useFormatDate() {
	function formatDate(dateString: Date | string) {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "short" });
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	}

	return { formatDate };
}
