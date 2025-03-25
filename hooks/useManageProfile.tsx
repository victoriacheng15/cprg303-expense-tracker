import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { useSessionContext } from "@/context/sessionContext";

export function useManageProfile() {
	const { session, signOut } = useSessionContext();
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [userProfile, setUserProfile] = useState<Profile>({
		firstName: "",
		lastName: "",
		email: "",
		updated_at: "",
		requiresNameUpdate: false,
	});

	useEffect(() => {
		async function getUserProfile() {
			try {
				const { data } = await supabase
					.from("profile")
					.select("*")
					.eq("user_id", session?.user.id);

				if (data) {
					const nameMissing = !data[0].first_name || !data[0].last_name;
					setUserProfile((prev) => ({
						...prev,
						firstName: data[0].first_name || "",
						lastName: data[0].last_name || "",
						email: data[0].email || "",
						updated_at: data[0].updated_at || "",
						requiresNameUpdate: nameMissing,
					}));

					if (nameMissing) {
						Alert.alert(
							"Complete Your Profile",
							"Please enter your first and last name",
							[{ text: "OK", onPress: () => setIsEditing(true) }],
						);
					}
				}

				console.log("User data:", data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}

		if (session?.user.id) {
			getUserProfile();
		}
	}, [session]);

	async function handleSave() {
		try {
			const { error } = await supabase
				.from("profile")
				.update({
					first_name: userProfile.firstName,
					last_name: userProfile.lastName,
				})
				.eq("user_id", session?.user.id);

			if (error) {
				Alert.alert("Error", "Failed to update profile");
				console.error(`Update error: ${error.message}`);
				return;
			}

			setUserProfile((prev) => ({
				...prev,
				requiresNameUpdate: false,
			}));
			setIsEditing(false);
		} catch (error) {
			Alert.alert("Error", "Failed to update profile");
			console.error("Update error:", error);
		} finally {
			setIsDeleting(false);
		}
	}

	function handleInputChange(field: string, value: string) {
		setUserProfile((prev) => ({
			...prev,
			[field]: value,
		}));
	}

	async function deleteAccount() {
		setIsDeleting(true);
		try {
			// first delete expenses related to this user
			await supabase
				.from("expenses")
				.delete()
				.eq("user_id", session?.user.id ?? "");
			// second delete profile data
			await supabase
				.from("profile")
				.delete()
				.eq("user_id", session?.user.id ?? "");

			// Then delete auth user
			const { error } = await supabase.auth.admin.deleteUser(
				session?.user.id ?? "",
			);

			if (error) throw error;

			// Sign out and redirect
			await signOut();
			Alert.alert("Success", "Your account has been permanently deleted");
		} catch (error) {
			console.error("Account deletion failed:", error);
			Alert.alert(
				"Error",
				"Failed to delete account. Please try again or contact support.",
			);
		}
	}

	function confirmDelete() {
		Alert.alert(
			"Delete Account",
			"This will permanently erase all your data. This cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: () => {
						Alert.alert(
							"Are you absolutely sure?",
							"Type DELETE to confirm account deletion",
							[
								{ text: "Cancel", style: "cancel" },
								{
									text: "Confirm",
									style: "destructive",
									onPress: () => {
										// Safe testing version - logs instead of actual deletion
										console.log("[TEST] Delete account flow triggered");
										Alert.alert(
											"TEST MODE",
											"Account deletion would execute here\n\n(Disabled for testing)",
											[
												{
													text: "OK",
													onPress: () =>
														console.log("[TEST] Deletion cancelled by user"),
												},
											],
										);
									},
								},
							],
						);
					},
				},
			],
		);
	}

	return {
		userProfile,
		isEditing,
		isDeleting,
		handleSave,
		handleInputChange,
		confirmDelete,
	};
}
