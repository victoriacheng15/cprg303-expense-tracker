import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { globalStyle } from "@/constants/";
import { useVisualization } from "@/hooks/useVisualization";
import { useGenerateDistinctColor } from "@/hooks/useGenerateDistinctColor";
import VisualizationFilter from "@/components/VisualizationFilter";

export default function ChartsScreen() {
	const {
		filterTypes: { year, month, category },
		filteredYears,
		filteredMonths,
		filteredCategories,
		handleFilterSelect,
		incomeCategories,
		getMonthlyTransactions,
		getYearlyTransactions,
		getMonthLabel,
	} = useVisualization();
	const { distinctColors } = useGenerateDistinctColor();
	const { width } = Dimensions.get("window");

	const categoryMonthlyData = getMonthlyTransactions.reduce<
		Record<string, number>
	>((acc, t) => {
		const cat = t.category_name;
		if (!incomeCategories.includes(cat)) {
			acc[cat] = (acc[cat] || 0) + t.amount;
		}

		return acc;
	}, {});

	const categoryYearlyData = getYearlyTransactions.reduce<
		Record<string, number>
	>((acc, t) => {
		const cat = t.category_name;
		if (!incomeCategories.includes(cat)) {
			acc[cat] = (acc[cat] || 0) + t.amount;
		}

		return acc;
	}, {});

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
				<ScrollView>
					<View style={styles.visualization}>
						{/* Render your chart component here */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Spending Data for {getMonthLabel(month)}, {year}
							</Text>
							{Object.entries(categoryMonthlyData).length > 0 ? (
								<PieChart
									data={Object.entries(categoryMonthlyData)
										.sort((a, b) => b[1] - a[1])
										.map(([category, amount], index) => ({
											name: category,
											amount,
											color: distinctColors[index],
											legendFontColor: "#7F7F7F",
										}))}
									width={width * 0.9}
									height={200}
									accessor="amount"
									backgroundColor="transparent"
									paddingLeft={"5"}
									chartConfig={{
										color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
									}}
									absolute
								/>
							) : (
								<Text>No expenses this month</Text>
							)}
						</View>
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Category Spending Data for {year}
							</Text>
							<PieChart
								data={Object.entries(categoryYearlyData)
									.sort((a, b) => b[1] - a[1])
									.map(([category, amount], index) => ({
										name: category,
										amount,
										color: distinctColors[index],
										legendFontColor: "#7F7F7F",
									}))}
								width={width * 0.9}
								height={200}
								accessor="amount"
								backgroundColor="transparent"
								paddingLeft={"15"}
								chartConfig={{
									color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								}}
								absolute
							/>
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
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	section: {
		justifyContent: "center",
		alignItems: "center",
	},
});
