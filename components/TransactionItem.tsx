import { StyleSheet, View, Text } from "react-native";

export default function TransactionItem({
	isIncome,
	name,
	category,
	amountText,
}: TransactionItemProps) {
	return (
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
