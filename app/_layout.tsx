import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SessionProvider } from "@/context/sessionContext";
import { TransactionsProvider } from "@/context/transactionsContext";
import { colors } from "@/constants/";

export default function RootLayout() {
	return (
		<SessionProvider>
			<TransactionsProvider>
				<SafeAreaView style={{ flex: 1 }}>
					<Stack
						screenOptions={{
							headerShown: true,
							title: "Expense Tracker",
							headerTintColor: colors.neutral.lightGray,
							headerStyle: { backgroundColor: colors.primary.darkBlue },
						}}
					>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
					<StatusBar style="auto" />
				</SafeAreaView>
			</TransactionsProvider>
		</SessionProvider>
	);
}
