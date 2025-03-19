interface SessionContextType {
	session: Session | null;
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

interface TransactionModalProps {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	showDatepicker: () => void;
	show: boolean;
	mode: ModeTypes;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onDateChange: (event: any, selectedDate?: Date) => void;
	name: string;
	setName: (name: string) => void;
	amount: string;
	setAmount: (amount: string) => void;
	category: string;
	setCategory: (category: string) => void;
	date: string;
	setDate: (date: string) => void;
	note: string;
	setNote: (note: string) => void;
	handleAddTransaction: () => void;
}
