import { StyleSheet, View, Text, FlatList } from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";
import { globalStyle } from "@/constants/";
import TransactionItem from "@/components/TransactionItem";
import ModalButton from "@/components/ModalButton";
import TransactionModal from "@/components/TransactionModal";

export default function Dashboard() {
	const { setModalVisible, transactions } = useTransactionsContext();
	const incomeCategories = ["Salary", "Freelance", "Investment"];

	// console.log("Transactions:", transactions);

	return (
		<View style={globalStyle.container}>
			<View style={styles.transactionContainer}>
				<Text style={styles.heading}>Recent Transactions</Text>

				{/* List of Transactions */}
				<FlatList
					data={transactions}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						const { category_name, name, amount } = item;
						// Determine if the transaction is income or expense
						const isIncome = incomeCategories.includes(category_name);

						return (
							<TransactionItem
								isIncome={isIncome}
								name={name}
								category={category_name}
								amountText={
									isIncome ? `+$${amount.toFixed(2)}` : `-$${amount.toFixed(2)}`
								}
							/>
						);
					}}
				/>
			</View>

			{/* Button to Open the Modal */}
			<ModalButton onPress={() => setModalVisible(true)} />

			{/* Modal for Adding a New Transaction */}
			<TransactionModal />
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
