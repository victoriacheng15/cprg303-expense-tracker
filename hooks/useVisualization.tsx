import { useMemo, useState } from "react";
import { useTransactionsContext } from "@/context/transactionsContext";
import { availableMonths, currentYear, currentMonth } from "@/constants/";

export function useVisualization() {
	const { transactions, incomeCategories } = useTransactionsContext();
	const [filterTypes, setFilterTypes] = useState<FilterTypes>({
		year: currentYear,
		month: currentMonth,
		category: null,
	});
	const [filterDropdown, setFilterDropdown] = useState({
		year: false,
		month: false,
		category: false,
	});

	// Extract available options from transactions
	const filteredYears = useMemo(() => {
		const years = transactions.map(({ date }) => {
			const dateStr = date.split("T")[0];
			return new Date(dateStr).getFullYear();
		});

		return [...new Set(years)].sort((a, b) => b - a).map(String);
	}, [transactions]);

	const filteredCategories = useMemo(() => {
		return [
			...new Set(
				transactions.map(({ category_name }) => category_name).filter(Boolean),
			),
		].map((cat) => ({ label: cat, value: cat }));
	}, [transactions]);

	// Get months that have transactions for selected year
	const filteredMonths = useMemo(() => {
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

	function getMonthLabel(month: string | null) {
		return availableMonths.find((m) => m.value === month)?.label;
	}

	type Grouped = { [year: string]: { [month: string]: TransactionItem[] } };

	const groupedTransactions = useMemo(() => {
		const grouped: Grouped = {};
		for (const t of transactions) {
			const date = new Date(t.date);
			const year = date.getFullYear().toString();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");

			if (!grouped[year]) grouped[year] = {};
			if (!grouped[year][month]) grouped[year][month] = [];

			grouped[year][month].push(t);
		}

		return grouped;
	}, [transactions]);

	const getMonthlyTransactions = useMemo(() => {
		if (!filterTypes.year || !filterTypes.month) return [];
		return (
			groupedTransactions[filterTypes.year]?.[filterTypes.month] || []
		).map(({ amount, category_name, date }) => ({
			amount,
			category_name,
			date,
		}));
	}, [filterTypes.year, filterTypes.month, groupedTransactions]);

	const getYearlyTransactions = useMemo(() => {
		if (!filterTypes.year) return [];
		return Object.values(groupedTransactions[filterTypes.year] || {})
			.flat()
			.map(({ amount, category_name, date }) => ({
				amount,
				category_name,
				date,
			}));
	}, [filterTypes.year, groupedTransactions]);

	function handleFilterSelect(
		type: "year" | "month" | "category",
		value: string | null,
	) {
		setFilterTypes((prev) => ({ ...prev, [type]: value }));
		setFilterDropdown((prev) => ({ ...prev, [type]: false }));
	}

	return {
		filterTypes,
		setFilterTypes,
		filterDropdown,
		setFilterDropdown,
		filteredMonths,
		filteredYears,
		filteredCategories,
		handleFilterSelect,
		incomeCategories,
		getMonthlyTransactions,
		getYearlyTransactions,
		getMonthLabel,
	};
}
