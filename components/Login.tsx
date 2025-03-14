import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { signInWithEmail } from "@/lib/supabase";

export default function Login() {
	const [email, setEmail] = useState("");
	const [loading, setLoadingg] = useState(false);

	async function handleLogin() {
		setLoadingg(true);
		try {
			const { error } = await signInWithEmail(email);

			if (error) {
				Alert.alert("Error", error.message);
			} else {
				Alert.alert("Success", "Check your email for the login link!");
			}
		} catch (error) {
			Alert.alert("Error", "An unexpected error occurred");
		} finally {
			setLoadingg(false);
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
				title={loading ? "Loading..." : "Send Magic Link"}
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
		borderRadius: 4,
	},
});
