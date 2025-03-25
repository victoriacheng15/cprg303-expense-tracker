import { StyleSheet, View, Text, TextInput } from "react-native";
import { globalStyle } from "@/constants/";
import { useManageProfile } from "@/hooks/useManageProfile";
import { useFormatDate } from "@/hooks/useFormatDate";
import SettingSaveButton from "@/components/SettingSaveButton";
import SettingDeleteButton from "@/components/SettingDeleteButton";

export default function SettingsScreen() {
	const {
		userProfile,
		isEditing,
		handleSave,
		handleInputChange,
		isDeleting,
		confirmDelete,
	} = useManageProfile();
	const { formatDate } = useFormatDate();

	const fields = [
		{
			key: "firstName",
			label: "First Name",
			editable: isEditing || userProfile.requiresNameUpdate,
			keyboardType: "default" as const,
		},
		{
			key: "lastName",
			label: "Last Name",
			editable: isEditing || userProfile.requiresNameUpdate,
			keyboardType: "default" as const,
		},
		{
			key: "email",
			label: "Email",
			editable: false,
			keyboardType: "email-address" as const,
		},
	];

	return (
		<View style={globalStyle.container}>
			<View style={styles.settingContainer}>
				<View style={styles.section}>
					<Text style={styles.header}>Account Information</Text>
					{fields.map(({ key, label, editable, keyboardType }) => (
						<View key={key}>
							<Text style={styles.label}>{label}</Text>
							<TextInput
								style={styles.input}
								value={userProfile[key]}
								onChangeText={(text) => handleInputChange(key, text)}
								editable={editable}
								keyboardType={key === "email" ? "email-address" : "default"}
							/>
						</View>
					))}
					<Text style={styles.updatedLabel}>
						Last Updated: {formatDate(userProfile.updated_at)}
					</Text>
					{(isEditing || userProfile.requiresNameUpdate) && (
						<SettingSaveButton handleSave={handleSave} />
					)}
				</View>

				<View style={styles.section}>
					<Text style={styles.header}>Danger Zone</Text>
					<SettingDeleteButton
						isDeleting={isDeleting}
						confirmDelete={confirmDelete}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	settingContainer: {
		flex: 1,
		backgroundColor: "#fff",
		width: "100%",
		padding: 20,
		borderRadius: 10,
		gap: 16,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	section: {
		backgroundColor: "#f8f8f8",
		padding: 15,
		borderRadius: 10,
		gap: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	updatedLabel: {
		fontSize: 14,
		color: "#888",
	},
	input: {
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 8,
		marginBottom: 10,
	},
});
