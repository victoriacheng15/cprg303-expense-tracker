import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { useSessionContext } from "@/context/sessionContext";

export default function Login() {
	const { signInWithEmail } = useSessionContext();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleLogin() {
		if (!email) {
			Alert.alert("Please enter your email.");
			return;
		}

		setLoading(true);
		await signInWithEmail(email);
		setLoading(false);
		setEmail("");
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Enter your email"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
			/>
			<Button
				title={"Sign In with Email"}
				onPress={handleLogin}
				disabled={loading}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 10,
		marginBottom: 20,
		borderRadius: 5,
	},
});
