import { router } from "expo-router";
import { supabase, redirectTo } from "@/lib/supabase";

export function useAuth() {
	async function signInWithEmail(email: string): Promise<void> {
		console.log(`Redriect url: ${redirectTo}`);
		try {
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: redirectTo,
				},
			});

			if (error) {
				throw new Error(error.message);
			}
		} catch (error) {
			console.error(`Error during sign-in: ${error}`);
		}
	}

	async function signOut(): Promise<void> {
		try {
			console.log("Signing out...");
			const { error } = await supabase.auth.signOut();

			if (error) {
				throw new Error(error.message);
			}

			console.log("Signed out!");
			router.replace("/");
		} catch (error) {
			console.error(`Error during sign-out: ${error}`);
		}
	}
	return {
		signInWithEmail,
		signOut,
	};
}
