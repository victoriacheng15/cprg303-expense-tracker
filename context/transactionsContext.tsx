import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { useSessionContext } from "./sessionContext";

const transactionObj = {
	id: "",
	name: "",
	amount: 0,
	category: null,
	category_name: "",
	date: "",
	note: "",
};

const datePickerConfigObj: DatePickerConfig = {
	show: false,
	mode: "date",
};

const TransactionsContext = createContext<TransactionsContextType>({
	transactions: [],
	transactionItem: transactionObj,
	modalVisible: false,
	datePickerConfig: datePickerConfigObj,
	setModalVisible: () => {},
	showDatepicker: () => {},
	onDateChange: () => {},
	isTransactionLoading: false,
	updateTransaction: () => {},
	resetTransaction: () => {},
	AddTransaction: async () => {},
	deleteTransaction: async () => {},
	getTransactions: () => {},
	incomeCategories: [],
});

export const useTransactionsContext = () => useContext(TransactionsContext);

export function TransactionsProvider({ children }: ChildrenProps) {
	const { session } = useSessionContext();
	const user = session?.user;

	const [modalVisible, setModalVisible] = useState(false);
	const [transactions, setTransactions] = useState<TransactionItem[]>([]);
	const [datePickerConfig, setDatePickerConfig] =
		useState<DatePickerConfig>(datePickerConfigObj);
	const [isTransactionLoading, setIsTransactionLoading] = useState(false);
	const [transactionItem, setTransactionItem] =
		useState<TransactionItem>(transactionObj);

	const { name, amount, category, date, note } = transactionItem;
	const incomeCategories = ["Salary", "Freelance", "Investment"];

	async function getTransactions() {
		try {
			setIsTransactionLoading(true);
			const { data: transactionsQuery, error } = await supabase
				.from("expenses")
				.select("*")
				.eq("user_id", user.id)
				.select(
					"id, name, amount, category_id, date, note, categories(category_name)",
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
		} catch (error) {
			console.error(`Error fetching transactions: ${error}`);
		} finally {
			setIsTransactionLoading(false);
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (user?.id) {
			getTransactions();
		}
	}, [user?.id]);

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

	async function AddTransaction() {
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

		resetTransaction();
	}

	async function deleteTransaction(id: string) {
		const { error } = await supabase.from("expenses").delete().eq("id", id);

		if (error) {
			console.error(`Error deleting transaction: ${error.message}`);
			Alert.alert("Error", "Failed to delete transaction. Please try again.");
			return;
		}
	}

	return (
		<TransactionsContext.Provider
			value={{
				modalVisible,
				setModalVisible,
				datePickerConfig,
				showDatepicker,
				onDateChange,
				isTransactionLoading,
				transactions,
				transactionItem,
				AddTransaction,
				updateTransaction,
				deleteTransaction,
				resetTransaction,
				getTransactions,
				incomeCategories,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
}
