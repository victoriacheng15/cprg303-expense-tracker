import { createContext, useContext, useState, useEffect } from "react";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { useAuth } from "@/hooks/useAuth";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const SessionContext = createContext<SessionContextType>({
	session: null,
	signInWithEmail: async () => {},
	signOut: async () => {},
});

export const useSessionContext = () => useContext(SessionContext);

export function SessionProvider({ children }: ChildrenProps) {
	const { signInWithEmail, signOut } = useAuth();
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		async function fetchSession() {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();

				setSession(session ?? null);
				console.log("Fetched session:", session);
				console.log("User:", session?.user);
			} catch (error) {
				console.error("Unexpected error:", error);
			}
		}

		async function createSessionFromUrl(url: string) {
			const { params, errorCode } = QueryParams.getQueryParams(url);

			if (errorCode) throw new Error(errorCode);

			const { access_token, refresh_token } = params;

			if (!access_token) return;

			const { data, error } = await supabase.auth.setSession({
				access_token,
				refresh_token,
			});

			if (error) throw error;
			setSession(data.session);
		}

		fetchSession();

		// Listen for real-time auth state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log("Auth state changed:", event);
			setSession(session ?? null);
		});

		// Set up the deep link listener
		const handleDeepLink = (event: { url: string }) => {
			console.log("Deep link URL:", event.url);
			createSessionFromUrl(event.url).catch((error) => {
				console.error("Error handling deep link:", error);
			});
		};

		const linkingSubscription = Linking.addEventListener("url", handleDeepLink);

		// Cleanup listeners
		return () => {
			subscription.unsubscribe();
			linkingSubscription.remove();
		};
	}, []);

	return (
		<SessionContext.Provider
			value={{
				session,
				signInWithEmail,
				signOut,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
}

function parseHashFragment(url: string) {
	const hash = new URL(url).hash.substring(1);
	return Object.fromEntries(new URLSearchParams(hash));
}