import { supabase, redirectTo } from "@/lib/supabase";
import { useSessionContext } from "@/context/sessionContext";

export function useAuth() {
	const { signOut } = useSessionContext();

	async function signInWithEmail(email: string) {
		console.log("Logging in...");
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: redirectTo,
			},
		});

		if (error) throw error;
		console.log("Logged in!");
	}

	return {
		signInWithEmail,
		signOut,
	};
}
