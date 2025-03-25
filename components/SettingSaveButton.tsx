import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function SettingSaveButton({
	handleSave,
}: { handleSave: () => void }) {
	return (
		<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
			<Text style={styles.saveText}>Save Changes</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	saveButton: {
		backgroundColor: "#4CAF50",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 10,
	},
	saveText: {
		color: "white",
		fontWeight: "bold",
	},
});
