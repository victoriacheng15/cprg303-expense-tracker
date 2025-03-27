import {
	StyleSheet,
	Modal,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTransactionsContext } from "@/context/transactionsContext";
import { useGetCategories } from "@/hooks/useGetCategories";
import { globalStyle } from "@/constants/";
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
	const { categoryState, selectedCategory, setSelectedCategory } =
		useGetCategories();
	const { categories, loading, error } = categoryState;

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
				<View style={globalStyle.modalContent}>
					<Text style={globalStyle.modalTitle}>Add Transaction</Text>

					{/* Name Input */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Name:</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter name"
							value={name}
							onChangeText={(value) => updateTransaction("name", value)}
						/>
					</View>

					{/* Amount Input */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Amount:</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter amount"
							value={String(amount)}
							onChangeText={(value) => updateTransaction("amount", value)}
							keyboardType="numeric"
						/>
					</View>

					{/* Category Input */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Category:</Text>
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
					</View>

					{/* Date Input */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Date:</Text>
						<TextInput
							style={styles.input}
							placeholder="YYYY-MM-DD"
							value={date}
							editable={false}
						/>
					</View>
					<TouchableOpacity style={globalStyle.button} onPress={showDatepicker}>
						<Text style={globalStyle.buttonText}>Select Date</Text>
					</TouchableOpacity>
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
					{/* <View style={styles.inputContainer}> */}
					<Text style={styles.label}>Note (Optional):</Text>
					<TextInput
						style={styles.textarea}
						placeholder="Enter note"
						value={note}
						onChangeText={(value) => updateTransaction("note", value)}
						multiline={true}
						numberOfLines={4}
						textAlignVertical="top"
					/>
					{/* </View> */}

					{/* Buttons */}
					<View style={globalStyle.buttonContainer}>
						<TouchableOpacity style={globalStyle.button} onPress={handleCancel}>
							<Text style={globalStyle.buttonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity style={globalStyle.button} onPress={handleAdd}>
							<Text style={globalStyle.buttonText}>Add</Text>
						</TouchableOpacity>
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
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
	},
	textarea: {
		height: 100,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		textAlignVertical: "top",
	},
});
