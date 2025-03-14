import { StyleSheet, View, Text } from "react-native";

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text>SettingsScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
