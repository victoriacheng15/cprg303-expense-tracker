import { StyleSheet, View, Text } from "react-native";

export default function Dashboard() {
	return (
		<View style={styles.container}>
			<Text>Dashboard</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
