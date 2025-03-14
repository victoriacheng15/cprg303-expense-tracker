import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const isDevelopment = process.env.NODE_ENV === "development";
const redirectTo = isDevelopment
	? process.env.EXPO_PUBLIC_DEV_REDIRECT_URL
	: process.env.EXPO_PUBLIC_PROD_REDIRECT_URL;

export const supabase = createClient(
	process.env.EXPO_PUBLIC_SUPABASE_URL || "",
	process.env.EXPO_PUBLIC_SUPABASE_KEY || "",
	{
		auth: {
			storage: AsyncStorage,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	},
);

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export async function signInWithEmail(email: string) {
	const { data, error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: redirectTo,
		},
	});
	return { data, error };
}
