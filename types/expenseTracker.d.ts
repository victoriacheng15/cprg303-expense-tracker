interface SessionContextType {
	session: Session | null;
	signInWithEmail: (email: string) => Promise<void>;
	signOut: () => Promise<void>;
}

interface ChildrenProps {
	children: React.ReactNode;
}

interface ColorsContextType {
	colors: {
		primary: {
			darkBlue: string;
			mediumBlue: string;
			lightBlue: string;
		};
		secondary: {
			skyBlue: string;
			paleBlue: string;
			navyBlue: string;
		};
		accent: {
			teal: string;
			coral: string;
			lavender: string;
		};
		neutral: {
			lightGray: string;
			mediumGray: string;
			darkGray: string;
		};
		notification: {
			yellow: string;
			green: string;
			coral: string;
		};
	};
}

interface TransactionItemProps {
	isIncome: boolean;
	name: string;
	category: string;
	amountText: string;
}

type ModeTypes = "date" | "time" | "datetime" | "countdown";

interface TransactionItem {
	category: number | null;
	name: string;
	amount: number;
	date: string;
	note: string;
}

interface DatePickerConfig {
	show: boolean;
	mode: ModeTypes;
}

interface TransactionModalProps {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	showDatepicker: () => void;
	datePickerConfig: DatePickerConfig;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onDateChange: (event: any, selectedDate?: Date) => void;
	transactionItem: TransactionItem;
	updateTransaction: (field: keyof TransactionItem, value: string) => void;
	handleAddTransaction: () => void;
	resetTransaction: () => void;
}

interface Category {
	id: number;
	name: string;
}

interface CategoryDropdownProps {
	categories: Category[];
	loading: boolean;
	error: Error | null;
	selectedCategory: Category | null;
	onSelect: (category: Category) => void;
}
