import {
	StyleSheet,
	View,
	Text,
	Modal,
	ScrollView,
	Button,
	Alert,
} from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";

interface TransactionItemModalProps {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	selectedTransaction: TransactionItem;
}

export default function TransactionItemModal({
	modalVisible,
	setModalVisible,
	selectedTransaction,
}: TransactionItemModalProps) {
	const { deleteTransaction, getTransactions } = useTransactionsContext();

	function formatDate(dateString: Date | string) {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "short" });
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	}

	async function hanadleDelete() {
		Alert.alert(
			"Delete a Transaction",
			"Are you sure you want to delete this transaction?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						await deleteTransaction(selectedTransaction.id);
						setModalVisible(false);
						getTransactions();
					},
				},
			],
			{
				cancelable: true,
			},
		);
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Transaction Details</Text>
					<ScrollView style={{ flexGrow: 1 }}>
						<View style={styles.infoContainer}>
							<Text style={styles.modalText}>Name:</Text>
							<Text>{selectedTransaction?.name}</Text>
						</View>
						<View style={styles.infoContainer}>
							<Text style={styles.modalText}>Category:</Text>
							<Text>{selectedTransaction?.category_name}</Text>
						</View>
						<View style={styles.infoContainer}>
							<Text style={styles.modalText}>Amount:</Text>
							<Text>{`${selectedTransaction?.amount.toFixed(2)}`}</Text>
						</View>
						<View style={styles.infoContainer}>
							<Text style={styles.modalText}>Date:</Text>
							<Text>
								{selectedTransaction?.date
									? formatDate(new Date(selectedTransaction.date))
									: "No date available"}
							</Text>
						</View>
						<View style={styles.infoContainer}>
							<Text style={styles.modalText}>Note:</Text>
							<Text>{selectedTransaction?.note || "No note"}</Text>
						</View>
					</ScrollView>
					<Button title="Delete" onPress={hanadleDelete} />
					<Button title="Close" onPress={() => setModalVisible(false)} />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: 300,
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		gap: 20,
	},
	infoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	modalText: {
		fontSize: 18,
		fontWeight: "500",
	},
});
