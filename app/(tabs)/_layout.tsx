import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Dashboard from "./dashboard";
import ChartsScreen from "./charts";
import SettingsScreen from "./settings";
import Logout from "@/components/Logout";
import { colors } from "@/constants/";

export default function TabLayout() {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			screenOptions={{
				headerTintColor: colors.neutral.lightGray,
				headerStyle: { backgroundColor: colors.primary.darkBlue },
				tabBarStyle: {
					backgroundColor: colors.primary.darkBlue,
				},
				tabBarActiveTintColor: colors.neutral.lightGray,
				tabBarInactiveTintColor: colors.neutral.mediumGray,
			}}
		>
			<Tab.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="dashboard" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Analysis"
				component={ChartsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="bar-chart" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="settings" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Logout"
				component={EmptyScreen}
				options={{
					tabBarIcon: ({ size, color }) => <Logout size={size} color={color} />,
				}}
			/>
		</Tab.Navigator>
	);
}

export function EmptyScreen() {
	return null;
}
