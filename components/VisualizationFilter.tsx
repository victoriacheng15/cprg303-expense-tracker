import { StyleSheet, View } from "react-native";
import VisualizationPicker from "./VisualizationPicker";

export default function VisualizationFilter({
	year,
	month,
	filteredYears,
	filteredMonths,
	handleFilterSelect,
}: VisualizationFilterProps) {
	return (
		<>
			<View style={styles.rowContainer}>
				{/* Year Picker */}
				<View style={[styles.pickerContainer, styles.halfWidth]}>
					<VisualizationPicker
						selectedValue={year}
						onValueChange={(value) => handleFilterSelect("year", value)}
						mode="dropdown"
						enabled={true}
						itemLabel="Year"
						itemsList={filteredYears.map((y) => ({ label: y, value: y }))}
					/>
				</View>

				{/* Month Picker */}
				<View style={[styles.pickerContainer, styles.halfWidth]}>
					<VisualizationPicker
						selectedValue={month}
						onValueChange={(value) => handleFilterSelect("month", value)}
						mode="dropdown"
						enabled={true}
						itemLabel={"Month"}
						itemsList={filteredMonths}
					/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	pickerContainer: {
		backgroundColor: "#ff",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	halfWidth: {
		width: "48%",
	},
});
