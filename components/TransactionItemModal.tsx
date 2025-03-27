import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Modal,
	ScrollView,
	TouchableOpacity,
	Alert,
	TextInput,
} from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";
import { useFormatDate } from "@/hooks/useFormatDate";
import { globalStyle, colors } from "@/constants/";

export default function TransactionItemModal({
	modalVisible,
	setModalVisible,
	selectedTransaction,
}: TransactionItemModalProps) {
	const { updateTransaction, deleteTransaction, getTransactions } =
		useTransactionsContext();
	const { formatDate } = useFormatDate();
	const [isEditing, setIsEditing] = useState(false);
	const [transaction, setTransaction] = useState(selectedTransaction);

	async function handleUpdate() {
		await updateTransaction(transaction);
		setIsEditing(false);
		getTransactions();
	}

	async function hanadleDelete() {
		Alert.alert(
			"Delete a Transaction",
			"Are you sure you want to delete this transaction?",
			[
				{
					text: "Cancel",
					style: "cancel",
					onPress: () => setModalVisible(false),
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						await deleteTransaction(transaction?.id);
						setModalVisible(false);
						getTransactions();
					},
				},
			],
			{
				cancelable: true,
				onDismiss: () => setModalVisible(false),
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
			<View style={globalStyle.modalOverlay}>
				<View style={globalStyle.modalContent}>
					<Text style={globalStyle.modalTitle}>
						{isEditing ? "Edit Transaction" : "Transaction Details"}
					</Text>
					<ScrollView style={{ flexGrow: 1 }}>
						{/* Name Input */}
						<View style={styles.infoContainer}>
							<Text style={globalStyle.modalText}>Name:</Text>
							{isEditing ? (
								<TextInput
									style={styles.input}
									value={transaction?.name}
									onChangeText={(value) =>
										setTransaction((prev) => ({ ...prev, name: value }))
									}
								/>
							) : (
								<Text>{transaction?.name}</Text>
							)}
						</View>

						{/* Amount Field */}
						<View style={styles.infoContainer}>
							<Text style={globalStyle.modalText}>Amount:</Text>
							{isEditing ? (
								<TextInput
									style={styles.input}
									value={String(transaction?.amount || 0)}
									onChangeText={(value) =>
										setTransaction((prev) => ({
											...prev,
											amount: Number(value),
										}))
									}
									keyboardType="numeric"
								/>
							) : (
								<Text>${transaction?.amount.toFixed(2)}</Text>
							)}
						</View>

						{/* Category Field */}
						<View style={styles.infoContainer}>
							<Text style={globalStyle.modalText}>Category:</Text>
							<Text>{transaction?.category_name}</Text>
						</View>

						{/* Date Field */}
						<View style={styles.infoContainer}>
							<Text style={globalStyle.modalText}>Date:</Text>
							<Text>
								{transaction?.date
									? formatDate(new Date(transaction.date))
									: "No date available"}
							</Text>
						</View>

						{/* Note Field */}
						<View style={styles.infoContainer}>
							<Text style={globalStyle.modalText}>Note:</Text>
							{isEditing ? (
								<TextInput
									style={styles.input}
									value={transaction?.note || ""}
									onChangeText={(value) =>
										setTransaction((prev) => ({
											...prev,
											note: value,
										}))
									}
								/>
							) : (
								<Text>{transaction?.note || "No note available"}</Text>
							)}
						</View>
					</ScrollView>
					<View style={globalStyle.buttonContainer}>
						<TouchableOpacity
							onPress={() => {
								setIsEditing(false);
								setModalVisible(false);
							}}
							style={globalStyle.button}
						>
							<Text style={globalStyle.buttonText}>Close</Text>
						</TouchableOpacity>
						{isEditing ? (
							<TouchableOpacity
								onPress={() => {
									if (isEditing) handleUpdate();
									setIsEditing(false);
								}}
								style={globalStyle.button}
							>
								<Text style={globalStyle.buttonText}>Save</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								onPress={() => setIsEditing(true)}
								style={globalStyle.button}
							>
								<Text style={globalStyle.buttonText}>Edit</Text>
							</TouchableOpacity>
						)}
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
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
	},
});
