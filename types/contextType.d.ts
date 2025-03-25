interface SessionContextType {
	session: Session | null;
	signInWithEmail: (email: string) => Promise<void>;
	signOut: () => Promise<void>;
}

interface TransactionsContextType {
	modalVisible: boolean;
	datePickerConfig: DatePickerConfig;
	setModalVisible: (visible: boolean) => void;
	showDatepicker: () => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onDateChange: (_: any, selectedDate?: Date) => void;
	transactions: TransactionItem[];
	transactionItem: TransactionItem;
	isTransactionLoading: boolean;
	updateTransaction: (
		field: keyof TransactionItem,
		value: string | number,
	) => void;
	resetTransaction: () => void;
	AddTransaction: () => Promise<void>;
	deleteTransaction: (id: string) => Promise<void>;
	getTransactions: () => void;
}
