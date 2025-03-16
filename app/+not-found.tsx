import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { globalStyle } from "@/constants/";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={globalStyle.container}>
				<Text>This screen doesn't exist.</Text>
				<Link href="/" style={styles.link}>
					<Text>Go to home screen!</Text>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
