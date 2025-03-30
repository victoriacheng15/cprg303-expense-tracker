import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyle } from "@/constants/";

interface ActionButtonProps {
	text?: string;
	icon?: keyof typeof MaterialIcons.glyphMap;
	iconColor?: string;
	onPress: () => void;
}
export default function ActionButton({
	text,
	icon,
	iconColor,
	onPress,
}: ActionButtonProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={text ? globalStyle.button : styles.cancelButton}
		>
			{icon && (
				<MaterialIcons name={icon} size={24} color={iconColor || "white"} />
			)}
			{text && <Text style={globalStyle.buttonText}>{text}</Text>}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cancelButton: {
		padding: 8,
	},
});
