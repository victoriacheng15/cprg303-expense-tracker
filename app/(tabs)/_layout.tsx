import { Alert } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { useSession } from "@/context/sessionContext";

export default function TabLayout() {
	const { signOut } = useSession();

	async function handleSignOut() {
		console.log("signing out");
		Alert.alert(
			"Sign Out",
			"Are you sure you want to sign out?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Sign Out",
					style: "destructive",
					onPress: async () => {
						await signOut();
					},
				},
			],
			{ cancelable: true },
		);
	}
	return (
		<Drawer
			drawerContent={(props) => (
				<DrawerContentScrollView {...props}>
					{/* Dashboard */}
					<DrawerItem
						label="Dashboard"
						icon={({ color, size }) => (
							<MaterialIcons name="dashboard" size={size} color={color} />
						)}
						onPress={() => props.navigation.navigate("dashboard")}
					/>

					{/* Charts */}
					<DrawerItem
						label="Analysis"
						icon={({ color, size }) => (
							<MaterialIcons name="bar-chart" size={size} color={color} />
						)}
						onPress={() => props.navigation.navigate("charts")}
					/>

					{/* Settings */}
					<DrawerItem
						label="Settings"
						icon={({ color, size }) => (
							<MaterialIcons name="settings" size={size} color={color} />
						)}
						onPress={() => props.navigation.navigate("settings")}
					/>

					{/* Sign Out */}
					<DrawerItem
						label="Sign Out"
						icon={({ color, size }) => (
							<MaterialIcons name="exit-to-app" size={size} color={color} />
						)}
						onPress={handleSignOut}
					/>
				</DrawerContentScrollView>
			)}
		>
			<Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
			<Drawer.Screen name="charts" options={{ title: "Analysis" }} />
			<Drawer.Screen name="settings" options={{ title: "Settings" }} />
		</Drawer>
	);
}
