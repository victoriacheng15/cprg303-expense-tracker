import { StyleSheet, View, Text, ScrollView } from "react-native";
import { globalStyle } from "@/constants/";
import { useVisualization } from "@/hooks/useVisualization";
import { useGenerateDistinctColor } from "@/hooks/useGenerateDistinctColor";
import VisualizationFilter from "@/components/VisualizationFilter";
import PieVisualization from "@/components/PieVisualization";

export default function ChartsScreen() {
	const {
		filterTypes: { year, month, category },
		filteredYears,
		filteredMonths,
		filteredCategories,
		handleFilterSelect,
		getMonthLabel,
		monthlyData,
		yearlyData,
	} = useVisualization();
	const { distinctColors } = useGenerateDistinctColor();

	function setupChartData(data: Record<string, number>) {
		return Object.entries(data)
			.sort((a, b) => b[1] - a[1])
			.map(([category, amount], index) => ({
				name: category,
				amount,
				color: distinctColors[index],
				legendFontColor: "#7F7F7F",
				legendFontSize: 14,
			}));
	}

	const monthIncomeDistribution = setupChartData(monthlyData.incomes);
	const monthSpendingDistribution = setupChartData(monthlyData.spendings);

	const yearIncomeDistribution = setupChartData(yearlyData.incomes);
	const yearSpendingDistribution = setupChartData(yearlyData.spendings);

	return (
		<View style={globalStyle.container}>
			<View style={styles.chartContainer}>
				<VisualizationFilter
					year={year}
					month={month}
					category={category}
					filteredYears={filteredYears}
					filteredMonths={filteredMonths}
					filteredCategories={filteredCategories}
					handleFilterSelect={handleFilterSelect}
				/>
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.visualization}>
						{/* Monthly Visualizations */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Incomes and Spendings for {getMonthLabel(month)}, {year}
							</Text>

							<Text style={styles.sectionSubTitle}>Income Distribution</Text>
							<PieVisualization data={monthIncomeDistribution} />

							<Text style={styles.sectionSubTitle}>Spending Distribution</Text>
							<PieVisualization data={monthSpendingDistribution} />
						</View>

						{/* Yearly Visualizations */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Incomes and Spendings for {year}
							</Text>

							<Text style={styles.sectionSubTitle}>Income Distribution</Text>
							<PieVisualization data={yearIncomeDistribution} />

							<Text style={styles.sectionSubTitle}>Spending Distribution</Text>
							<PieVisualization data={yearSpendingDistribution} />
						</View>
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	chartContainer: {
		flex: 1,
		backgroundColor: "#fff",
		width: "100%",
		padding: 16,
		borderRadius: 5,
	},
	visualization: {
		marginTop: 16,
		alignItems: "center",
		gap: 16,
	},
	section: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	sectionSubTitle: {
		fontSize: 14,
		marginBottom: 8,
	},
});
