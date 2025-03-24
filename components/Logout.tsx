import { Alert, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSessionContext } from "@/context/sessionContext";

interface LogoutProps {
	size: number;
	color: string;
}

export default function Logout({ size, color }: LogoutProps) {
	const { signOut } = useSessionContext();

	async function handleSignOut() {
		Alert.alert("Sign out", "Are you sure you want to sign out?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Sign Out",
				style: "destructive",
				onPress: async () => {
					await signOut();
					router.replace("/");
				},
			},
		],{cancelable: true});
	}

	return (
		<TouchableOpacity onPress={handleSignOut}>
			<MaterialIcons name="logout" size={size} color={color} />
		</TouchableOpacity>
	);
}
