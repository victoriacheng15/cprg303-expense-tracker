import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import * as Linking from "expo-linking";

interface SessionContextType {
	session: Session | null;
	signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({
	session: null,
	signOut: async () => {},
});

export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);

	// Fetch the initial session and listen for auth state changes
	useEffect(() => {
		// Fetch the initial session
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => setSession(session));

		// Listen for auth state changes
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => setSession(session),
		);

		// Cleanup the listener on unmount
		return () => {
			if (authListener?.subscription) {
				authListener.subscription.unsubscribe();
			}
		};
	}, []);

	async function signOut() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Error signing out:", error);
		} else {
			setSession(null);
			router.replace("/");
		}
	}

	async function handleDeepLink(event: { url: string }) {
		const url = event.url;

		// Parse the URL manually
		const urlObject = new URL(url);
		// Remove the '#' and parse the hash fragment
		const hashParams = new URLSearchParams(urlObject.hash.substring(1));

		// Extract the tokens and type from the hash fragment
		const access_token = hashParams.get("access_token");
		const refresh_token = hashParams.get("refresh_token");
		const type = hashParams.get("type");

		if (type === "magiclink" && access_token && refresh_token) {
			try {
				const tokens = {
					access_token,
					refresh_token,
				};

				const { data, error } = await supabase.auth.setSession(tokens);

				if (error) {
					console.error("Error setting session:", error);
				} else {
					console.log("User logged in:", data);
					setSession(data.session);
				}
			} catch (error) {
				console.error("Error setting session:", error);
			}
		}
	}

	// Handle deep linking for Supabase magic links
	useEffect(() => {
		// Listen for deep link events
		const subscription = Linking.addEventListener("url", handleDeepLink);

		// Check if the app was opened with a deep link
		Linking.getInitialURL()
			.then((url) => {
				if (url) handleDeepLink({ url });
			})
			.catch((error) => {
				console.error("Error getting initial URL:", error);
			});

		// Cleanup the subscription on unmount
		return () => subscription.remove();
	}, []);

	return (
		<SessionContext.Provider value={{ session, signOut }}>
			{children}
		</SessionContext.Provider>
	);
}
