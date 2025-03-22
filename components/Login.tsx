import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signInWithEmail } = useAuth();

	async function handleLogin() {
		setIsLoading(true);

		try {
			await signInWithEmail(email);
			Alert.alert("Success", "Check your email for the login link!");
		} catch (error) {
			Alert.alert(
				"Error",
				error instanceof Error ? error.message : String(error),
			);
		} finally {
			setIsLoading(false);
			setEmail("");
		}
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
				title={isLoading ? "Loading..." : "Send Magic Link"}
				onPress={handleLogin}
				disabled={isLoading}
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
		borderRadius: 4,
	},
});
