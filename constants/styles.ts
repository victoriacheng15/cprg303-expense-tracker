import { StyleSheet } from "react-native";
import { colors } from "./Colors";

export const globalStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: colors.secondary.paleBlue,
	},
});
