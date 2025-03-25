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
