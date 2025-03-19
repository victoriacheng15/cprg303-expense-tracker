import { useState } from "react";
import { Alert } from "react-native";

export function useAddTransaction() {
	const [modalVisible, setModalVisible] = useState(false);
	const [show, setShow] = useState(false);
	const [mode, setMode] = useState<ModeTypes>("date");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [date, setDate] = useState("");
	const [note, setNote] = useState("");

	// Sample data for transactions
	const transactions = [
		{
			id: "1",
			category: "Food",
			name: "McDonald's",
			amount: -50.0,
			date: "2023-10-01",
		},
		{
			id: "2",
			category: "Salary",
			name: "Monthly Salary",
			amount: 2000.0,
			date: "2023-10-05",
		},
		{
			id: "3",
			category: "Transport",
			name: "Uber Ride",
			amount: -20.0,
			date: "2023-10-07",
		},
		{
			id: "4",
			category: "Entertainment",
			name: "Netflix Subscription",
			amount: -30.0,
			date: "2023-10-08",
		},
		{
			id: "5",
			category: "Freelance",
			name: "Website Design Project",
			amount: 500.0,
			date: "2023-10-10",
		},
		{
			id: "6",
			category: "Utilities",
			name: "Electricity Bill",
			amount: -100.0,
			date: "2023-10-12",
		},
		{
			id: "7",
			category: "Shopping",
			name: "Zara Shopping",
			amount: -75.0,
			date: "2023-10-15",
		},
		{
			id: "8",
			category: "Investment",
			name: "Stock Dividends",
			amount: 300.0,
			date: "2023-10-18",
		},
		{
			id: "9",
			category: "Health",
			name: "Gym Membership",
			amount: -40.0,
			date: "2023-10-20",
		},
		{
			id: "10",
			category: "Travel",
			name: "Flight to New York",
			amount: -200.0,
			date: "2023-10-25",
		},
	];

	function showDatepicker() {
		setShow(true);
		setMode("date");
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function onDateChange(_: any, selectedDate?: Date) {
		const currentDate = selectedDate || (date ? new Date(date) : new Date());
		setShow(false);

		// Format the date as YYYY-MM-DD
		const formattedDate = currentDate.toISOString().split("T")[0];
		setDate(formattedDate);
	}

	function handleAddTransaction() {
		// Validate inputs
		if (!name || !amount || !category || !date) {
			Alert.alert("Error", "Please fill out all required fields.");
			return;
		}

		// Add the new transaction to the list (or send to the backend)
		const newTransaction = {
			id: String(transactions.length + 1), // Temporary ID
			category,
			name,
			amount: Number(amount),
			date,
			note,
		};

		console.log("New Transaction:", newTransaction);

		// Close the modal and reset the form
		setModalVisible(false);
		setName("");
		setAmount("");
		setCategory("");
		setDate("");
		setNote("");
	}

	return {
		modalVisible,
		setModalVisible,
		showDatepicker,
		show,
		mode,
		onDateChange,
		name,
		setName,
		amount,
		setAmount,
		category,
		setCategory,
		date,
		setDate,
		note,
		setNote,
		handleAddTransaction,
		transactions,
	};
}
