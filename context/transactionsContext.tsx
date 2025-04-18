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
	updateTransactionItem: () => {},
	resetTransaction: () => {},
	AddTransaction: async () => {},
	updateTransaction: async () => {},
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
	const [isTransactionLoading, setIsTransactionLoading] = useState(false);
	const [datePickerConfig, setDatePickerConfig] =
		useState<DatePickerConfig>(datePickerConfigObj);
	const [transactionItem, setTransactionItem] =
		useState<TransactionItem>(transactionObj);

	const { name, amount, category, date, note } = transactionItem;
	const incomeCategories = ["Salary", "Freelance", "Investment"];

	async function getTransactions() {
		setIsTransactionLoading(true);

		try {
			const { data: transactionsQuery, error } = await supabase
				.from("expenses")
				.select("*")
				.eq("user_id", user.id)
				.select(
					"id, name, amount, category_id, date, note, categories(category_name)",
				);

			if (error) {
				throw new Error(`Supabase get transactions error: ${error.message}`);
			}

			const restructuredData: TransactionItem[] = transactionsQuery.map(
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

			const sortedTransactionsByDate = [...restructuredData].sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			});

			setTransactions(sortedTransactionsByDate);
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

	function updateTransactionItem(
		field: keyof TransactionItem,
		value: string | number,
	) {
		setTransactionItem((prev) => ({ ...prev, [field]: value }));
	}

	// Reset transaction form
	function resetTransaction() {
		setTransactionItem(transactionObj);
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
			throw new Error(`Supabase add transaction error: ${error.message}`);
		}

		resetTransaction();
	}

	async function updateTransaction(transactionItem: TransactionItem) {
		const updatedTransaction = {
			name: transactionItem.name,
			amount: Number(transactionItem.amount),
			category_id: transactionItem.category,
			date: transactionItem.date,
			note: transactionItem.note,
		};

		const { error } = await supabase
			.from("expenses")
			.update(updatedTransaction)
			.eq("id", transactionItem.id);

		if (error) {
			throw new Error(`Supabase update transaction error: ${error.message}`);
		}
	}

	async function deleteTransaction(id: string) {
		const { error } = await supabase.from("expenses").delete().eq("id", id);

		if (error) {
			throw new Error(`Supabase delete transaction error: ${error.message}`);
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
				updateTransactionItem,
				AddTransaction,
				resetTransaction,
				deleteTransaction,
				updateTransaction,
				getTransactions,
				incomeCategories,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
}
