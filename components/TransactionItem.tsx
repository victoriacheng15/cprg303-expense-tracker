import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";
import TransactionItemModal from "./TransactionItemModal";

export default function TransactionItem({
	isIncome,
	name,
	category,
	amountText,
	id,
}: TransactionItemProps) {
	const { transactions } = useTransactionsContext();
	const [modalVisible, setModalVisible] = useState(false);
	const selectedTransaction = transactions.find((item) => item.id === id);

	return (
		<>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={styles.transactionItem}>
					<View style={styles.transactionDetails}>
						<Text style={styles.transactionName}>{name}</Text>
						<Text style={styles.transactionCategory}>{category}</Text>
					</View>
					<Text
						style={[
							styles.transactionAmount,
							isIncome ? styles.positiveAmount : styles.negativeAmount,
						]}
					>
						{amountText}
					</Text>
				</View>
			</TouchableOpacity>

			{/* Modal for Transaction Details */}
			{selectedTransaction && (
				<TransactionItemModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					selectedTransaction={selectedTransaction}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	transactionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	transactionDetails: {
		flex: 1,
	},
	transactionName: {
		fontSize: 16,
		fontWeight: "500",
		color: "#333",
	},
	transactionCategory: {
		fontSize: 12,
		color: "#666",
	},
	transactionAmount: {
		fontSize: 16,
		fontWeight: "500",
	},
	negativeAmount: {
		color: "#ff4444",
	},
	positiveAmount: {
		color: "#00C851",
	},
});
