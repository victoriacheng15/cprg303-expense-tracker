import { StyleSheet, View } from "react-native";
import VisualizationPicker from "./VisualizationPicker";

export default function VisualizationFilter({
	year,
	month,
	category,
	availableYears,
	filteredMonths,
	availableCategories,
	handleFilterSelect,
}: VisualizationFilterProps) {
	return (
		<>
			{/* First Row - Year and Month Pickers */}
			<View style={styles.rowContainer}>
				{/* Year Picker */}
				<View style={[styles.pickerContainer, styles.halfWidth]}>
					<VisualizationPicker
						selectedValue={year}
						onValueChange={(value) => handleFilterSelect("year", value)}
						// dropdownIconColor="#007AFF"
						mode="dropdown"
						enabled={true}
						itemLabel="Year"
						itemsList={availableYears.map((y) => ({ label: y, value: y }))}
					/>
				</View>

				{/* Month Picker */}
				<View style={[styles.pickerContainer, styles.halfWidth]}>
					<VisualizationPicker
						selectedValue={month}
						onValueChange={(value) => handleFilterSelect("month", value)}
						// dropdownIconColor="#007AFF"
						mode="dropdown"
						enabled={!!year}
						itemLabel={"Month"}
						itemsList={filteredMonths}
					/>
				</View>
			</View>

			{/* Second Row - Category Picker */}
			<View style={styles.pickerContainer}>
				<VisualizationPicker
					selectedValue={category}
					onValueChange={(value) => handleFilterSelect("category", value)}
					// dropdownIconColor="#007AFF"
					mode="dropdown"
					enabled={true}
					itemLabel="Select Category"
					itemsList={availableCategories}
				/>
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
		backgroundColor: "white",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#e0e0e0",
		overflow: "hidden",
	},
	halfWidth: {
		width: "48%",
	},
});
