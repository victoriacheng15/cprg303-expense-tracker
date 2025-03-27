import {
	StyleSheet,
	View,
	Text,
	Modal,
	ScrollView,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";
import { useFormatDate } from "@/hooks/useFormatDate";
import { globalStyle, colors } from "@/constants/";

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
			<View style={globalStyle.modalOverlay}>
				<View style={globalStyle.modalContent}>
					<Text style={globalStyle.modalTitle}>Transaction Details</Text>
					<ScrollView style={{ flexGrow: 1 }}>
						{fields.map(({ label, value }) => (
							<View key={label} style={styles.infoContainer}>
								<Text style={globalStyle.modalText}>{label}:</Text>
								<Text>{value}</Text>
							</View>
						))}
					</ScrollView>
					<View style={globalStyle.buttonContainer}>
						<TouchableOpacity
							onPress={() => setModalVisible(false)}
							style={globalStyle.button}
						>
							<Text style={globalStyle.buttonText}>Close</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => console.log("editing...")}
							style={globalStyle.button}
						>
							<Text style={globalStyle.buttonText}>Edit</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={hanadleDelete}
							style={globalStyle.button}
						>
							<Text style={globalStyle.buttonText}>Delete</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	infoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral.mediumGray,
		gap: 16,
	},
});
