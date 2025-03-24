import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export function useHandleProfile() {
	const [shouldHandleProfile, setShouldHandleProfile] = useState(true);

	async function handleProfile(user: User) {
		try {
			const { error: fetchError } = await supabase
				.from("profile")
				.select("user_id")
				.eq("user_id", user.id)
				.single();

			// https://docs.postgrest.org/en/v12/references/errors.html
			// PGRST116 - More than 1 or no items where returned when requesting a singular response.
			if (fetchError?.code === "PGRST116") {
				console.log(`Creating a new profile for user ${user.email}`);

				await supabase
					.from("profile")
					.insert({ user_id: user.id, email: user.email });

				console.log("Profile created successfully");
			}
		} catch (error) {
			console.error(`Error in handling profile: ${error}`);
		}
	}

	return {
		handleProfile,
		shouldHandleProfile,
		setShouldHandleProfile,
	};
}
