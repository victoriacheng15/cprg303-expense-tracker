import { StyleSheet, Modal, View, Text, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTransactionsContext } from "@/context/transactionsContext";
import { useGetCategories } from "@/hooks/useGetCategories";
import CategoryDropdown from "./CategoyDropdown";

export default function TransactionModal() {
	const {
		modalVisible,
		setModalVisible,
		datePickerConfig,
		showDatepicker,
		onDateChange,
		transactionItem,
		updateTransaction,
		resetTransaction,
		AddTransaction,
		getTransactions,
	} = useTransactionsContext();
	const { name, amount, date, note } = transactionItem;
	const { show, mode } = datePickerConfig;
	const {
		categoryState: { categories, loading, error },
		selectedCategory,
		setSelectedCategory,
	} = useGetCategories();

	function handleCancel() {
		setModalVisible(false);
		setSelectedCategory(null);
		resetTransaction();
	}

	function handleAdd() {
		AddTransaction();
		setSelectedCategory(null);
		resetTransaction();
		getTransactions();
	}

	return (
		<Modal visible={modalVisible} animationType="slide" transparent={true}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Add Transaction</Text>

					{/* Name Input */}
					<Text style={styles.label}>Name</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter name"
						value={name}
						onChangeText={(value) => updateTransaction("name", value)}
					/>

					{/* Amount Input */}
					<Text style={styles.label}>Amount</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter amount"
						value={String(amount)}
						onChangeText={(value) => updateTransaction("amount", value)}
						keyboardType="numeric"
					/>

					{/* Category Input */}
					<Text style={styles.label}>Category</Text>
					<CategoryDropdown
						categories={categories}
						loading={loading}
						error={error}
						selectedCategory={selectedCategory}
						onSelect={(category) => {
							setSelectedCategory(category);
							updateTransaction("category", String(category.id));
						}}
					/>

					{/* Date Input */}
					<Text style={styles.label}>Date</Text>
					<TextInput
						style={styles.input}
						placeholder="YYYY-MM-DD"
						value={date}
						editable={false}
					/>
					<Button title="Select Date" onPress={showDatepicker} />
					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date ? new Date(date) : new Date()}
							mode={mode}
							is24Hour={true}
							display="default"
							onChange={onDateChange}
						/>
					)}

					{/* Note Input */}
					<Text style={styles.label}>Note (Optional)</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter note"
						value={note}
						onChangeText={(value) => updateTransaction("note", value)}
					/>

					{/* Buttons */}
					<View style={styles.buttonContainer}>
						<Button title="Cancel" onPress={handleCancel} />
						<Button title="Add" onPress={handleAdd} />
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		marginBottom: 8,
		color: "#333",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 16,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
