import {
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	Platform,
} from "react-native";
import { Redirect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSessionContext } from "@/context/sessionContext";
import { globalStyle, colors } from "@/constants/";
import Login from "@/components/Login";

export default function App() {
	const { session } = useSessionContext();

	if (session) {
		return <Redirect href="/(tabs)/dashboard" />;
	}

	// If the user is not logged in, show the login screen
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View style={globalStyle.container}>
						<View style={styles.container}>
							{/* Header with app icon and name */}
							<View style={styles.header}>
								<View style={styles.logoContainer}>
									<MaterialIcons
										style={{ marginRight: 10 }}
										name="wallet"
										size={30}
										color="black"
									/>
									<Text style={styles.appName}>Expense Tracker</Text>
								</View>
							</View>

							{/* Hero section */}
							<View style={styles.hero}>
								<Text style={styles.title}>Take Control of Your Spending</Text>
								<Text style={styles.subtitle}>
									Track expenses, set budgets, and achieve your financial goals
								</Text>
							</View>

							{/* Features grid */}
							<View style={styles.features}>
								<View style={styles.featureCard}>
									<Text style={styles.featureTitle}>Visual Reports</Text>
									<Text style={styles.featureText}>
										Beautiful charts to understand your spending patterns
									</Text>
								</View>

								<View style={styles.featureCard}>
									<Text style={styles.featureTitle}>Smart Budgets</Text>
									<Text style={styles.featureText}>
										Set limits and get alerts when you're close
									</Text>
								</View>
							</View>

							{/* Login section */}
							<View style={styles.authSection}>
								<Text style={styles.authPrompt}>Ready to take control?</Text>
								<Login />
							</View>
						</View>
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		padding: 16,
	},
	header: {
		marginTop: 20,
		marginBottom: 20,
		alignItems: "center",
	},
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	appName: {
		fontSize: 24,
		fontWeight: "700",
		color: "#3a86ff",
	},
	hero: {
		alignItems: "center",
		marginVertical: 20,
	},
	heroImage: {
		resizeMode: "contain",
		marginBottom: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: "#212529",
		textAlign: "center",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#6c757d",
		textAlign: "center",
		lineHeight: 24,
		paddingHorizontal: 20,
	},
	features: {
		alignItems: "center",
		marginVertical: 20,
		gap: 20,
	},
	featureCard: {
		width: "100%",
		backgroundColor: colors.neutral.lightGray,
		borderRadius: 5,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	featureTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.primary.darkBlue,
		marginBottom: 5,
	},
	featureText: {
		fontSize: 16,
		color: colors.secondary.navyBlue,
	},
	authSection: {
		marginTop: 20,
		marginBottom: 20,
	},
	authPrompt: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
});
