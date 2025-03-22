import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";

const SessionContext = createContext<SessionContextType>({
	user: null,
	isLoading: true,
	signOut: async () => {},
});

export const useSessionContext = () => useContext(SessionContext);

export function SessionProvider({ children }: ChildrenProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	async function handleProfile(user: User) {
		console.log("Fetching profile...");
		const { data: profile, error } = await supabase
			.from("profile")
			.select("*")
			.eq("user_id", user.id)
			.single();

		if (error?.code === "PGRST116") {
			// No profile found
			console.log("Creating profile...");
			await supabase.from("profile").insert({
				user_id: user.id,
				email: user.email,
			});
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function initializeAuth() {
			// Check initial session
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user ?? null);
			setIsLoading(false);

			// Listen for auth changes
			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange(async (event, session) => {
				console.log("Auth event:", event);
				// Handle all session updates
				const currentUser = session?.user ?? null;
				setUser(currentUser);
				setIsLoading(false);

				// Handle post-auth logic for ANY successful auth
				if (currentUser && !user) {
					await handleProfile(currentUser);
				}
			});

			return subscription;
		}

		const subscriptionPromise = initializeAuth();

		return () => {
			subscriptionPromise.then((subscription) => {
				subscription?.unsubscribe();
			});
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Deep link handling
		async function handleDeepLink(url: string | null) {
			console.log("[Deep Link] Received URL:", url);
			if (!url) return;

			const { access_token, refresh_token, type } = parseHashFragment(url);

			if (type === "magiclink" && access_token && refresh_token) {
				const { data, error } = await supabase.auth.setSession({
					access_token,
					refresh_token,
				});

				if (!error && data.session) {
					console.log("Session set with magiclink!");
					setUser(data.session.user);
					await handleProfile(data.session.user);
				}
			}
		}

		// Listen for incoming links
		const subscription = Linking.addEventListener("url", ({ url }) =>
			handleDeepLink(url),
		);

		// Check initial URL
		Linking.getInitialURL().then(handleDeepLink);

		return () => subscription.remove();
	}, []);

	async function signOut() {
		console.log("Signing out...");
		const { error } = await supabase.auth.signOut();
		if (!error) {
			setUser(null);
			router.replace("/");
		}
		console.log("Signed out!");
	}

	return (
		<SessionContext.Provider value={{ user, isLoading, signOut }}>
			{children}
		</SessionContext.Provider>
	);
}

function parseHashFragment(url: string) {
	const hash = new URL(url).hash.substring(1);
	return Object.fromEntries(new URLSearchParams(hash));
}
