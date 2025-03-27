import { StyleSheet, View, Text, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { globalStyle, screenWidth } from "@/constants/";
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
		getMonthLabel,
		monthlyData,
		yearlyData,
	} = useVisualization();
	const { distinctColors } = useGenerateDistinctColor();

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
						{/* Render your chart component here */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Incomes and Spendings for {getMonthLabel(month)}, {year}
							</Text>
							<Text style={styles.sectionSubTitle}>Income Distribution</Text>
							<PieChart
								data={Object.entries(monthlyData.incomes)
									.sort((a, b) => b[1] - a[1])
									.map(([category, amount], index) => ({
										name: category,
										amount,
										color: distinctColors[index],
										legendFontColor: "#7F7F7F",
										legendFontSize: 14,
									}))}
								width={screenWidth * 0.9}
								height={200}
								accessor="amount"
								backgroundColor="transparent"
								paddingLeft={"15"}
								chartConfig={{
									color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								}}
							/>
							<Text style={styles.sectionSubTitle}>Spending Distribution</Text>
							<PieChart
								data={Object.entries(monthlyData.spendings)
									.sort((a, b) => b[1] - a[1])
									.map(([category, amount], index) => ({
										name: category,
										amount,
										color: distinctColors[index],
										legendFontColor: "#7F7F7F",
										legendFontSize: 14,
									}))}
								width={screenWidth * 0.9}
								height={200}
								accessor="amount"
								backgroundColor="transparent"
								paddingLeft={"15"}
								chartConfig={{
									color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								}}
							/>
						</View>
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Incomes and Spendings for {year}
							</Text>
							<Text style={styles.sectionSubTitle}>Income Distribution</Text>
							<PieChart
								data={Object.entries(yearlyData.incomes)
									.sort((a, b) => b[1] - a[1])
									.map(([category, amount], index) => ({
										name: category,
										amount,
										color: distinctColors[index],
										legendFontColor: "#7F7F7F",
										legendFontSize: 14,
									}))}
								width={screenWidth * 0.9}
								height={200}
								accessor="amount"
								backgroundColor="transparent"
								paddingLeft={"15"}
								chartConfig={{
									color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								}}
							/>
							<Text style={styles.sectionSubTitle}>Spending Distribution</Text>
							<PieChart
								data={Object.entries(yearlyData.spendings)
									.sort((a, b) => b[1] - a[1])
									.map(([category, amount], index) => ({
										name: category,
										amount,
										color: distinctColors[index],
										legendFontColor: "#7F7F7F",
										legendFontSize: 14,
									}))}
								width={screenWidth * 0.9}
								height={200}
								accessor="amount"
								backgroundColor="transparent"
								paddingLeft={"15"}
								chartConfig={{
									color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								}}
							/>
						</View>
					</View>
					<View style={styles.section}>{/*  */}</View>
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
