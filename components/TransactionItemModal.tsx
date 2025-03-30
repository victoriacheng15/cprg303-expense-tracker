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
						<View
							style={[
								globalStyle.inputContainer,
								globalStyle.inputBorderBottom,
							]}
						>
							<Text style={globalStyle.label}>Name:</Text>
							<TextInput
								style={[
									globalStyle.input,
									!isEditing && styles.disabledInput,
									{ textAlign: "right" },
								]}
								value={transaction?.name}
								onChangeText={(value) =>
									setTransaction((prev) => ({ ...prev, name: value }))
								}
								editable={isEditing}
							/>
						</View>

						{/* Amount Field */}
						<View
							style={[
								globalStyle.inputContainer,
								globalStyle.inputBorderBottom,
							]}
						>
							<Text style={globalStyle.label}>Amount:</Text>
							<TextInput
								style={[
									globalStyle.input,
									!isEditing && styles.disabledInput,
									{ textAlign: "right" },
								]}
								value={(transaction?.amount || 0).toFixed(2)}
								onChangeText={(value) =>
									setTransaction((prev) => ({
										...prev,
										amount: Number(value),
									}))
								}
								keyboardType="numeric"
								editable={isEditing}
							/>
						</View>

						{/* Category Field */}
						<View
							style={[
								globalStyle.inputContainer,
								globalStyle.inputBorderBottom,
							]}
						>
							<Text style={globalStyle.label}>Category:</Text>
							<TextInput
								style={[
									globalStyle.input,
									styles.disabledInput,
									{ textAlign: "right" },
								]}
								value={transaction?.category_name}
								editable={false}
							/>
						</View>

						{/* Date Field */}
						<View
							style={[
								globalStyle.inputContainer,
								globalStyle.inputBorderBottom,
							]}
						>
							<Text style={globalStyle.label}>Date:</Text>
							<TextInput
								style={[
									globalStyle.input,
									styles.disabledInput,
									{ textAlign: "right" },
								]}
								value={
									transaction?.date
										? formatDate(new Date(transaction.date))
										: "No date available"
								}
								editable={false}
							/>
						</View>

						{/* Note Field */}
						<View
							style={[
								globalStyle.inputContainer,
								globalStyle.inputBorderBottom,
							]}
						>
							<Text style={globalStyle.label}>Note:</Text>
							<TextInput
								style={[
									globalStyle.textarea,
									!isEditing && styles.disabledInput,
								]}
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
								editable={isEditing}
							/>
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
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral.mediumGray,
	},
	disabledInput: {
		borderWidth: 0,
	},
});
