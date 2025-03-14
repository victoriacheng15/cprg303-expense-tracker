import { StyleSheet, View, Text } from "react-native";
import { useSession } from "@/context/sessionContext";
import Login from "@/components/Login";

export default function App() {
	const { session } = useSession();

	return (
		<View style={styles.container}>
			<View style={styles.container}>
				{session ? <Text>Signed in as {session.user.email}</Text> : <Login />}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flex: 1,
		backgroundColor: "#fff",
	},
});
