import { colors } from "./Colors";
import { globalStyle, width as screenWidth } from "./styles";

const availableMonths = [
	{ label: "January", value: "01" },
	{ label: "February", value: "02" },
	{ label: "March", value: "03" },
	{ label: "April", value: "04" },
	{ label: "May", value: "05" },
	{ label: "June", value: "06" },
	{ label: "July", value: "07" },
	{ label: "August", value: "08" },
	{ label: "September", value: "09" },
	{ label: "October", value: "10" },
	{ label: "November", value: "11" },
	{ label: "December", value: "12" },
];

const currentYear = new Date().getFullYear().toString();
const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");

export {
	colors,
	globalStyle,
	screenWidth,
	availableMonths,
	currentYear,
	currentMonth,
};
