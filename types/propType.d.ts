interface ChildrenProps {
	children: React.ReactNode;
}

interface TransactionItemProps {
	isIncome: boolean;
	name: string;
	category: string;
	amountText: string;
	id: string;
}

interface CategoryDropdownProps {
	categories: Category[];
	loading: boolean;
	error: Error | null;
	selectedCategory: Category | null;
	onSelect: (category: Category) => void;
}

interface TransactionItemModalProps {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	selectedTransaction: TransactionItem;
}

interface LogoutProps {
	size: number;
	color: string;
}

interface SettingDeleteButtonProps {
	isDeleting: boolean;
	confirmDelete: () => void;
}

interface VisualizationPickerProps {
	selectedValue: string | null;
	onValueChange: (value: string | null) => void;
	dropdownIconColor?: string;
	mode?: "dropdown" | "dialog";
	enabled: boolean;
	itemLabel: string;
	itemsList: { label: string; value: string }[];
}

interface VisualizationFilterProps {
	year: string | null;
	month: string | null;
	category: string | null;
	filteredYears: string[];
	filteredMonths: { label: string; value: string }[];
	filteredCategories: { label: string; value: string }[];
	handleFilterSelect: (
		type: "year" | "month" | "category",
		value: string | null,
	) => void;
}
