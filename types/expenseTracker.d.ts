type ModeTypes = "date" | "time" | "datetime" | "countdown";
type selectedCategory = Category | null;

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

interface CategoryState {
	categories: Category[];
	loading: boolean;
	error: Error | null;
}

interface Profile {
	firstName: string;
	lastName: string;
	email: string;
	updated_at: Date | string;
	requiresNameUpdate?: boolean;
}

interface FilterTypes {
	year: string | null;
	month: string | null;
	category: string | null;
}

interface VisualizationData {
	incomes: Record<string, number>;
	spendings: Record<string, number>;
}
