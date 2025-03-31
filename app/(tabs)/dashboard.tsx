import { useState, useCallback } from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	RefreshControl,
	ScrollView,
} from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";
import { globalStyle, screenWidth } from "@/constants/";
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

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		getTransactions();
		setRefreshing(false);
	}, [getTransactions]);

	return (
		<View style={globalStyle.container}>
			<ScrollView
				style={{ width: screenWidth * 0.9 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						colors={["#007AFF"]}
					/>
				}
			>
				<View style={styles.transactionContainer}>
					{isTransactionLoading && !refreshing ? (
						<>
							<Text style={styles.text}>Loading transactions...</Text>
							<Text style={styles.text}>
								If this takes too long to load, pull down to refresh
							</Text>
						</>
					) : !transactions.length && !refreshing ? (
						<Text style={styles.text}>No transactions found</Text>
					) : (
						<>
							<Text style={globalStyle.title}>Recent Transactions</Text>
							<FlatList
								data={transactions.slice(0, 10)}
								keyExtractor={(item) => item.id}
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
								scrollEnabled={false}
							/>
						</>
					)}
				</View>
			</ScrollView>

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
		padding: 20,
		borderRadius: 5,
	},
	text: {
		fontSize: 18,
		fontWeight: "semibold",
		textAlign: "center",
	},
});
