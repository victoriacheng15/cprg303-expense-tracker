import { createContext, useContext, useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useCheckProfile } from "@/hooks/useCheckProfile";

const SessionContext = createContext<SessionContextType>({
	session: null,
	signInWithEmail: async () => {},
	signOut: async () => {},
});

export const useSessionContext = () => useContext(SessionContext);

export function SessionProvider({ children }: ChildrenProps) {
	const { signInWithEmail, signOut } = useAuth();
	const { checkProfile, shouldCheckProfile, setShouldCheckProfile } =
		useCheckProfile();
	const [session, setSession] = useState<Session | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function fetchSession() {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();

				setSession(session ?? null);

				if (session?.user && shouldCheckProfile) {
					await checkProfile(session.user);
					setShouldCheckProfile(false);
				}
			} catch (error) {
				console.error(`Error fetching session: ${error}`);
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

			if (error) {
				throw new Error(`Supabase set session error: ${error.message}`);
			}

			setSession(data.session);
		}

		async function handleAuthStateChange(
			event: string,
			session: Session | null,
		) {
			console.log(`Auth state changed: ${event}`);
			setSession(session ?? null);

			if (session?.user && shouldCheckProfile) {
				await checkProfile(session.user);
				setShouldCheckProfile(false);
			}
		}

		fetchSession();

		// Listen for real-time auth state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(handleAuthStateChange);

		// Set up the deep link listener
		function handleDeepLink(event: { url: string }) {
			console.log(`Deep Link URL: ${event.url}`);
			createSessionFromUrl(event.url).catch((error) => {
				console.error(`Error creating session from URL: ${error}`);
			});
		}

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
