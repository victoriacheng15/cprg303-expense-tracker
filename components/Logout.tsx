import { Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";

interface LogoutProps {
	size: number;
	color: string;
}

export default function Logout({ size, color }: LogoutProps) {
	const { signOut } = useAuth();

	function handleSignOut() {
		Alert.alert("Sign Out", "Are you sure you want to sign out?", [
			{ text: "Cancel", style: "cancel" },
			{ text: "Sign Out", onPress: signOut, style: "destructive" },
		]);
	}

	return (
		<TouchableOpacity onPress={handleSignOut}>
			<MaterialIcons name="logout" size={size} color={color} />
		</TouchableOpacity>
	);
}
