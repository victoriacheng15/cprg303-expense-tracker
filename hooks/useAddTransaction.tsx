import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSessionContext } from "@/context/sessionContext";
import { supabase } from "@/lib/supabase";

export function useAddTransaction() {
	const {
		session: { user },
	} = useSessionContext();
	const [transactions, setTransactions] = useState<TransactionItem[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [datePickerConfig, setDatePickerConfig] = useState<DatePickerConfig>({
		show: false,
		mode: "date",
	});
	const [transactionItem, setTransactionItem] = useState<TransactionItem>({
		id: "",
		name: "",
		amount: 0,
		category: null,
		category_name: "",
		date: "",
		note: "",
	});

	const { name, amount, category, date, note } = transactionItem;

	async function getTransactions() {
		const { data: transactionsQuery, error } = await supabase
			.from("expenses")
			.select("*")
			.eq("user_id", user.id)
			.select(
				"id, name,amount, category_id, date, note, categories(category_name)",
			);

		if (error) {
			console.error(`Error fetching transactions: ${error.message}`);
			return;
		}

		const reorganizedData: TransactionItem[] = transactionsQuery.map(
			(item) => ({
				id: item.id,
				category: item.category_id,
				category_name: item.categories?.category_name,
				name: item.name,
				amount: item.amount,
				date: item.date,
				note: item.note,
			}),
		);

		setTransactions(reorganizedData);
	}

	function showDatepicker() {
		setDatePickerConfig((prev) => ({ ...prev, show: true }));
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function onDateChange(_: any, selectedDate?: Date) {
		const currentDate = selectedDate || (date ? new Date(date) : new Date());
		setDatePickerConfig((prev) => ({ ...prev, show: false }));

		// Format the date as YYYY-MM-DD
		const formattedDate = currentDate.toISOString().split("T")[0];
		setTransactionItem((prev) => ({ ...prev, date: formattedDate }));
	}

	// Helper function to update a specific field in the transaction
	function updateTransaction(
		field: keyof TransactionItem,
		value: string | number,
	) {
		setTransactionItem((prev) => ({ ...prev, [field]: value }));
	}

	// Reset transaction form
	function resetTransaction() {
		setTransactionItem({
			id: "",
			name: "",
			amount: 0,
			category: null,
			category_name: "",
			date: "",
			note: "",
		});
	}

	async function handleAddTransaction() {
		// Validate inputs
		if (!name || !amount || !category || !date) {
			Alert.alert("Error", "Please fill out all required fields.");
			return;
		}

		// Add the new transaction to the list (or send to the backend)
		const newTransaction = {
			name,
			date,
			note,
			amount: Number(amount),
			category_id: Number(category),
			user_id: user.id,
		};

		const { error } = await supabase.from("expenses").insert(newTransaction);

		if (error) {
			console.error(`Error adding transaction: ${error.message}`);
			Alert.alert("Error", "Failed to add transaction. Please try again.");
			return;
		}

		// console.log("New Transaction:", newTransaction);
		resetTransaction();
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getTransactions();
	}, []);

	return {
		modalVisible,
		setModalVisible,
		showDatepicker,
		datePickerConfig,
		onDateChange,
		transactionItem,
		updateTransaction,
		resetTransaction,
		handleAddTransaction,
		getTransactions,
		transactions,
	};
}
