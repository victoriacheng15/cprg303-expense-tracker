import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface SettingDeleteButtonProps {
	isDeleting: boolean;
	confirmDelete: () => void;
}

export default function SettingDeleteButton({
	isDeleting,
	confirmDelete,
}: SettingDeleteButtonProps) {
	return (
		<TouchableOpacity
			style={[styles.deleteButton, isDeleting && styles.disabledButton]}
			onPress={confirmDelete}
			disabled={isDeleting}
		>
			<Text style={styles.deleteText}>
				{isDeleting ? "Deleting..." : "Delete Account"}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	saveText: {
		color: "white",
		fontWeight: "bold",
	},
	deleteButton: {
		backgroundColor: "#ff4d4d",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	deleteText: {
		color: "white",
		fontWeight: "bold",
	},
	disabledButton: {
		backgroundColor: "#ff8080",
		flexDirection: "row",
		gap: 8,
	},
});
