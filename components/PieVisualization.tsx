import { PieChart } from "react-native-chart-kit";
import { screenWidth } from "@/constants/";

export default function PieVisualization({ data }: PieVisualizationProps) {
	return (
		<PieChart
			data={data}
			width={screenWidth * 0.9}
			height={200}
			accessor="amount"
			backgroundColor="transparent"
			paddingLeft={"15"}
			chartConfig={{
				color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
			}}
		/>
	);
}
