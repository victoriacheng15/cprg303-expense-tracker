interface SessionContextType {
	session: Session | null;
	signInWithEmail: (email: string) => Promise<void>;
	signOut: () => Promise<void>;
}

interface TransactionsContextType {
	transactions: TransactionItem[];
	transactionItem: TransactionItem;
	modalVisible: boolean;
	datePickerConfig: DatePickerConfig;
	setModalVisible: (visible: boolean) => void;
	showDatepicker: () => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onDateChange: (_: any, selectedDate?: Date) => void;
	updateTransaction: (
		field: keyof TransactionItem,
		value: string | number,
	) => void;
	resetTransaction: () => void;
	AddTransaction: () => Promise<void>;
	getTransactions: () => void;
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
	id: string;
}

type ModeTypes = "date" | "time" | "datetime" | "countdown";

interface TransactionItem {
	id: string;
	category: number | null;
	category_name: string;
	name: string;
	amount: number;
	date: string;
	note: string;
}

interface DatePickerConfig {
	show: boolean;
	mode: ModeTypes;
}

interface Category {
	id: number;
	category_name: string;
}

interface CategoryDropdownProps {
	categories: Category[];
	loading: boolean;
	error: Error | null;
	selectedCategory: Category | null;
	onSelect: (category: Category) => void;
}
