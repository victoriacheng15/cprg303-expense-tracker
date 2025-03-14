import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SessionProvider } from "@/context/sessionContext";

export default function RootLayout() {
	return (
		<SessionProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style="auto" />
			</SafeAreaView>
		</SessionProvider>
	);
}
