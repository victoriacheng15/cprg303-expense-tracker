import {
	StyleSheet,
	View,
	Text,
	Modal,
	ScrollView,
	Button,
	Alert,
	Dimensions,
} from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";
import { useFormatDate } from "@/hooks/useFormatDate";

const { width } = Dimensions.get("window");

export default function TransactionItemModal({
	modalVisible,
	setModalVisible,
	selectedTransaction,
}: TransactionItemModalProps) {
	const { deleteTransaction, getTransactions } = useTransactionsContext();
	const { formatDate } = useFormatDate();

	async function hanadleDelete() {
		Alert.alert(
			"Delete a Transaction",
			"Are you sure you want to delete this transaction?",
			[
				{
					text: "Cancel",
					style: "cancel",
					onPress: () => {
						setModalVisible(false);
					},
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
				onDismiss: () => {
					setModalVisible(false);
				},
			},
		);
	}

	const fields = [
		{
			label: "Name",
			value: selectedTransaction?.name,
		},
		{
			label: "Category",
			value: selectedTransaction?.category_name,
		},
		{
			label: "Date",
			value: selectedTransaction?.date
				? formatDate(new Date(selectedTransaction.date))
				: "No date available",
		},
		{
			label: "Amount",
			value: `$${selectedTransaction?.amount.toFixed(2)}`,
		},
		{
			label: "Note",
			value: selectedTransaction?.note || "No note availabile",
		},
	];

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
						{fields.map(({ label, value }) => (
							<View key={label} style={styles.infoContainer}>
								<Text style={styles.modalText}>{label}:</Text>
								<Text>{value}</Text>
							</View>
						))}
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
		width: width * 0.8,
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
		gap: 16,
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
