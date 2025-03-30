import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./Colors";

export const { width } = Dimensions.get("window");

export const globalStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: colors.secondary.paleBlue,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: width * 0.8,
		backgroundColor: colors.neutral.lightGray,
		padding: 20,
		borderRadius: 5,
		gap: 16,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 10,
	},
	button: {
		backgroundColor: colors.primary.mediumBlue,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 10,
	},
	inputBorderBottom: {
		paddingVertical: 6,
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral.mediumGray,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: colors.neutral.mediumGray,
		borderRadius: 5,
		paddingHorizontal: 8,
		textAlign: "right",
	},
	textarea: {
		height: 100,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		paddingHorizontal: 8,
		textAlignVertical: "top",
	},
});
