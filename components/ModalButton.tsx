import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/constants/";

export default function ModalButton({ onPress }: { onPress: () => void }) {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<MaterialIcons name="add" size={24} color={colors.primary.darkBlue} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		bottom: 10,
		backgroundColor: colors.secondary.skyBlue,
		width: 56,
		height: 56,
		borderRadius: "100%",
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
});
