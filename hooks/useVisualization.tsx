import { useMemo, useState } from "react";
import { useTransactionsContext } from "@/context/transactionsContext";
import { availableMonths } from "@/constants/";

export function useVisualization() {
	const { transactions } = useTransactionsContext();
	const [filterTypes, setFilterTypes] = useState({
		year: null,
		month: null,
		category: null,
	});
	const [filterDropdown, setFilterDropdown] = useState({
		year: false,
		month: false,
		category: false,
	});

	// Extract available options from transactions
	const availableYears = [
		...new Set(
			transactions.map(({ date }) => new Date(date).getFullYear().toString()),
		),
	].sort((a, b) => b.localeCompare(a)); // Sort descending (newest first)

	const availableCategories = [
		...new Set(
			transactions.map(({ category_name }) => category_name).filter(Boolean),
		),
	].map((cat) => ({ label: cat, value: cat }));

	function handleFilterSelect(
		type: "year" | "month" | "category",
		value: string | null,
	) {
		setFilterTypes((prev) => ({ ...prev, [type]: value }));
		setFilterDropdown((prev) => ({ ...prev, [type]: false }));
	}

	function clearFilters() {
		setFilterTypes({ year: null, month: null, category: null });
	}

	// Get months that have transactions for selected year
	const filteredMonths = useMemo(() => {
		if (!filterTypes.year) return availableMonths;

		const monthsWithTransactions = new Set(
			transactions
				.filter(
					(t) => new Date(t.date).getFullYear().toString() === filterTypes.year,
				)
				.map((t) =>
					(new Date(t.date).getMonth() + 1).toString().padStart(2, "0"),
				),
		);

		return availableMonths.filter((month) =>
			monthsWithTransactions.has(month.value),
		);
	}, [filterTypes.year, transactions]);

	return {
		filterTypes,
		setFilterTypes,
		filterDropdown,
		setFilterDropdown,
		availableMonths,
		availableYears,
		availableCategories,
		handleFilterSelect,
		clearFilters,
		filteredMonths,
	};
}
