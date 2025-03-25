import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function VisualizationPicker({
	selectedValue,
	onValueChange,
	dropdownIconColor,
	mode,
	enabled,
	itemLabel,
	itemsList,
}: VisualizationPickerProps) {
	return (
		<Picker
			selectedValue={selectedValue}
			onValueChange={onValueChange}
			style={styles.picker}
			dropdownIconColor={dropdownIconColor}
			mode={mode}
			enabled={enabled}
		>
			<Picker.Item label={itemLabel} value={null} />
			{itemsList.map((item) => (
				<Picker.Item key={item.value} label={item.label} value={item.value} />
			))}
		</Picker>
	);
}

const styles = StyleSheet.create({
	picker: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
	},
});
