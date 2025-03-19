import { StyleSheet, View, Text, FlatList } from "react-native";
import { globalStyle } from "@/constants/";
import { useAddTransaction } from "@/hooks/useAddTransaction";
import TransactionItem from "@/components/TransactionItem";
import ModalButton from "@/components/ModalButton";
import TransactionModal from "@/components/TransactionModal";

export default function Dashboard() {
	const {
		modalVisible,
		setModalVisible,
		showDatepicker,
		datePickerConfig,
		onDateChange,
		transactionItem,
		updateTransaction,
		handleAddTransaction,
		transactions,
	} = useAddTransaction();
	const incomeCategories = ["Salary", "Freelance", "Investment"];

	return (
		<View style={globalStyle.container}>
			<View style={styles.transactionContainer}>
				<Text style={styles.heading}>Recent Transactions</Text>

				{/* List of Transactions */}
				<FlatList
					data={transactions}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						const { category, name, amount } = item;
						// Determine if the transaction is income or expense
						const isIncome = incomeCategories.includes(category);

						return (
							<TransactionItem
								isIncome={isIncome}
								name={name}
								category={category}
								amountText={isIncome ? `+$${amount}` : `-$${Math.abs(amount)}`}
							/>
						);
					}}
				/>
			</View>

			{/* Button to Open the Modal */}
			<ModalButton onPress={() => setModalVisible(true)} />

			{/* Modal for Adding a New Transaction */}
			<TransactionModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				showDatepicker={showDatepicker}
				datePickerConfig={datePickerConfig}
				onDateChange={onDateChange}
				transactionItem={transactionItem}
				updateTransaction={updateTransaction}
				handleAddTransaction={handleAddTransaction}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	transactionContainer: {
		flex: 1,
		backgroundColor: "#fff",
		width: "100%",
		padding: 20,
		borderRadius: 10,
	},
	heading: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 16,
	},
});
