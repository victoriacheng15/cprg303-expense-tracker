import { Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSession } from "@/context/sessionContext";

export default function Logout({
	size,
	color,
}: { size: number; color: string }) {
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
		<TouchableOpacity onPress={handleSignOut}>
			<MaterialIcons
				name="logout"
				size={size}
				color={color}
				onPress={handleSignOut}
			/>
		</TouchableOpacity>
	);
}
