import { StyleSheet, Modal, View, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTransactionsContext } from "@/context/transactionsContext";
import { useGetCategories } from "@/hooks/useGetCategories";
import { globalStyle } from "@/constants/";
import CategoryDropdown from "./CategoyDropdown";
import ActionButton from "./ActionButton";

export default function TransactionModal() {
	const {
		modalVisible,
		setModalVisible,
		datePickerConfig,
		showDatepicker,
		onDateChange,
		transactionItem,
		updateTransactionItem,
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
					<View style={globalStyle.inputContainer}>
						<Text style={globalStyle.label}>Name:</Text>
						<TextInput
							style={globalStyle.input}
							placeholder="Enter name"
							value={name}
							onChangeText={(value) => updateTransactionItem("name", value)}
						/>
					</View>

					{/* Amount Input */}
					<View style={globalStyle.inputContainer}>
						<Text style={globalStyle.label}>Amount:</Text>
						<TextInput
							style={globalStyle.input}
							placeholder="Enter amount"
							value={String(amount)}
							onChangeText={(value) => updateTransactionItem("amount", value)}
							keyboardType="numeric"
						/>
					</View>

					{/* Category Input */}
					<View style={globalStyle.inputContainer}>
						<Text style={globalStyle.label}>Category:</Text>
						<CategoryDropdown
							categories={categories}
							loading={loading}
							error={error}
							selectedCategory={selectedCategory}
							onSelect={(category) => {
								setSelectedCategory(category);
								updateTransactionItem("category", String(category.id));
							}}
						/>
					</View>

					{/* Date Input */}
					<View style={globalStyle.inputContainer}>
						<Text style={globalStyle.label}>Date:</Text>
						<TextInput
							style={globalStyle.input}
							placeholder="YYYY-MM-DD"
							value={date}
							editable={false}
						/>
					</View>
					<ActionButton onPress={showDatepicker} text={"Select Date"} />
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
					<Text style={globalStyle.label}>Note (Optional):</Text>
					<TextInput
						style={globalStyle.textarea}
						placeholder="Enter note"
						value={note}
						onChangeText={(value) => updateTransactionItem("note", value)}
						multiline={true}
						numberOfLines={4}
						textAlignVertical="top"
					/>
					{/* </View> */}

					{/* Buttons */}
					<View style={globalStyle.buttonContainer}>
						<ActionButton onPress={handleCancel} text={"Cancel"} />
						<ActionButton onPress={handleAdd} text={"Add"} />
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
});
