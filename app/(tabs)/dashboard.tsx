import { useState, useCallback } from "react";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";
import { globalStyle } from "@/constants/";
import TransactionItem from "@/components/TransactionItem";
import TransactionModalButton from "@/components/TransactionModalButton";
import TransactionModal from "@/components/TransactionModal";

export default function Dashboard() {
	const {
		setModalVisible,
		isTransactionLoading,
		transactions,
		getTransactions,
		incomeCategories,
	} = useTransactionsContext();
	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = useCallback(async () => {
		setRefreshing(true);
		await getTransactions(); // Use the existing context function
		setRefreshing(false);
	}, [getTransactions]);

	if (isTransactionLoading && !refreshing) {
		return (
			<View style={globalStyle.container}>
				<View style={styles.transactionContainer}>
					<Text style={styles.text}>Loading transactions...</Text>
					<Text style={styles.text}>
						If this takes too long to load, try to swap down to refresh
					</Text>
				</View>
			</View>
		);
	}

	if (!transactions.length && !refreshing) {
		return (
			<View style={globalStyle.container}>
				<View style={styles.transactionContainer}>
					<Text style={styles.text}>No transactions found</Text>
					<TransactionModalButton onPress={() => setModalVisible(true)} />
					<TransactionModal />
				</View>
			</View>
		);
	}

	// console.log("Transactions:", transactions);

	return (
		<View style={globalStyle.container}>
			<View style={styles.transactionContainer}>
				<Text style={styles.heading}>Recent Transactions</Text>

				{/* List of Transactions */}
				<FlatList
					data={transactions}
					keyExtractor={(item) => item.id}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={handleRefresh}
							colors={["#007AFF"]} // Android
						/>
					}
					renderItem={({ item }) => {
						const { id, category_name, name, amount } = item;
						const isIncome = incomeCategories.includes(category_name);
						const formattedAmount = isIncome
							? `+$${amount.toFixed(2)}`
							: `-$${amount.toFixed(2)}`;

						return (
							<TransactionItem
								id={id}
								isIncome={isIncome}
								name={name}
								category={category_name}
								amountText={formattedAmount}
							/>
						);
					}}
				/>
			</View>

			{/* Button to open the add new transaction modal */}
			<TransactionModalButton onPress={() => setModalVisible(true)} />
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
	text: {
		fontSize: 18,
		fontWeight: "semibold",
	},
});
