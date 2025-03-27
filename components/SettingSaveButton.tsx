import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function SettingSaveButton({
	handleSave,
}: { handleSave: () => void }) {
	return (
		<TouchableOpacity style={styles.button} onPress={handleSave}>
			<Text style={styles.text}>Save Changes</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#4CAF50",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 10,
	},
	text: {
		color: "white",
		fontWeight: "bold",
	},
});
