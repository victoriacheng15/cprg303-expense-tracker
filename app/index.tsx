import { StyleSheet, View, Text } from "react-native";
import { Redirect } from "expo-router";
import { useSessionContext } from "@/context/sessionContext";
import { globalStyle } from "@/constants/";
import Login from "@/components/Login";

export default function App() {
	const { session } = useSessionContext();

	if (session) {
		return <Redirect href="/(tabs)/dashboard" />;
	}

	// If the user is not logged in, show the login screen
	return (
		<View style={globalStyle.container}>
			<Text style={styles.title}>Welcome to the App</Text>
			<Text style={styles.subtitle}>Please log in to continue.</Text>
			<Login />
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
	},
});
