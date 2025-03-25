import { StyleSheet, View, Text, Pressable } from "react-native";
import { globalStyle } from "@/constants/";
import { useVisualization } from "@/hooks/useVisualization";
import VisualizationFilter from "@/components/VisualizationFilter";

export default function ChartsScreen() {
	const {
		filterTypes,
		availableYears,
		filteredMonths,
		availableCategories,
		handleFilterSelect,
		clearFilters,
	} = useVisualization();

	return (
		<View style={globalStyle.container}>
			<View style={styles.chartContainer}>
				<VisualizationFilter
					year={filterTypes.year}
					month={filterTypes.month}
					category={filterTypes.category}
					availableYears={availableYears}
					filteredMonths={filteredMonths}
					availableCategories={availableCategories}
					handleFilterSelect={handleFilterSelect}
				/>
				{/* Clear Filters Button */}
				<Pressable
					style={[
						styles.clearButton,
						!filterTypes.year &&
							!filterTypes.month &&
							!filterTypes.category &&
							styles.disabledClearButton,
					]}
					onPress={clearFilters}
					disabled={
						!filterTypes.year && !filterTypes.month && !filterTypes.category
					}
				>
					<Text style={styles.clearButtonText}>Clear Filters</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	chartContainer: {
		flex: 1,
		backgroundColor: "#fff",
		width: "100%",
		padding: 20,
		borderRadius: 10,
	},
	clearButton: {
		marginTop: 16,
		padding: 12,
		backgroundColor: "#ff3b30",
		borderRadius: 8,
		alignItems: "center",
	},
	clearButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	disabledClearButton: {
		backgroundColor: "#cccccc",
		opacity: 0.8,
	},
});
