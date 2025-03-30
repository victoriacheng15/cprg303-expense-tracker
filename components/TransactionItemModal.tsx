import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Modal,
	ScrollView,
	Alert,
	TextInput,
} from "react-native";
import { useTransactionsContext } from "@/context/transactionsContext";
import { useFormatDate } from "@/hooks/useFormatDate";
import { globalStyle, colors } from "@/constants/";
import ActionButton from "./ActionButton";

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

	function HandleSave() {
		if (isEditing) handleUpdate();
	}

	function handleCancel() {
		setIsEditing(false);
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
					<View style={styles.modalHeader}>
						<Text style={globalStyle.modalTitle}>
							{isEditing ? "Edit Transaction" : "Transaction Details"}
						</Text>
						{isEditing && (
							<ActionButton
								onPress={handleCancel}
								icon="cancel"
								iconColor={colors.accent.coral}
							/>
						)}
					</View>
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
									multiline={true}
									numberOfLines={4}
									textAlignVertical="top"
								/>
							) : (
								<Text>{transaction?.note || "No note available"}</Text>
							)}
						</View>
					</ScrollView>
					<View style={globalStyle.buttonContainer}>
						<ActionButton
							onPress={() => setModalVisible(false)}
							text={"Close"}
						/>
						{isEditing ? (
							<ActionButton onPress={HandleSave} text={"Save"} />
						) : (
							<ActionButton onPress={() => setIsEditing(true)} text={"Edit"} />
						)}
						<ActionButton onPress={hanadleDelete} text={"Delete"} />
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
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral.mediumGray,
		gap: 16,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		paddingHorizontal: 8,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral.mediumGray,
	},
});
