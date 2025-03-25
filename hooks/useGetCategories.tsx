import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useGetCategories() {
	const [categoryState, setCategoryState] = useState<CategoryState>({
		categories: [],
		loading: true,
		error: null,
	});
	const [selectedCategory, setSelectedCategory] =
		useState<selectedCategory>(null);

	async function getCategories() {
		setCategoryState((prev) => ({
			...prev,
			loading: true,
			error: null,
		}));

		try {
			const { data, error } = await supabase
				.from("categories")
				.select("id, category_name")
				.order("category_name", { ascending: true });

			if (error) throw new Error(`Supabase error: ${error.message}`);

			setCategoryState((prev) => ({
				...prev,
				categories: data,
				loading: false,
			}));
		} catch (error) {
			console.error(`Error fetching categories: ${error}`);
			setCategoryState((prev) => ({
				...prev,
				loading: false,
				error: error instanceof Error ? error : new Error("Unknown error"),
			}));
		} finally {
			setCategoryState((prev) => ({
				...prev,
				loading: false,
			}));
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getCategories();
	}, []);

	return {
		categoryState,
		selectedCategory,
		setSelectedCategory,
	};
}
