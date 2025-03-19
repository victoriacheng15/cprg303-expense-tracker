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

interface TransactionModalProps {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	datePickerVisible: boolean;
	setDatePickerVisible: (visible: boolean) => void;
	handleDateChange: (selectedDate: Date | undefined) => void;
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
