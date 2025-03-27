import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function SettingDeleteButton({
	isDeleting,
	confirmDelete,
}: SettingDeleteButtonProps) {
	return (
		<TouchableOpacity
			style={[styles.button, isDeleting && styles.disabled]}
			onPress={confirmDelete}
			disabled={isDeleting}
		>
			<Text style={styles.text}>
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
	button: {
		backgroundColor: "#ff4d4d",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	text: {
		color: "white",
		fontWeight: "bold",
	},
	disabled: {
		backgroundColor: "#ff8080",
		flexDirection: "row",
		gap: 8,
	},
});
