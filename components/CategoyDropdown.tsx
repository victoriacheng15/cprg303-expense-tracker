import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Modal,
	Pressable,
	ScrollView,
	ActivityIndicator,
} from "react-native";

export default function CategoryDropdown({
	categories,
	loading,
	error,
	selectedCategory,
	onSelect,
}: CategoryDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);

	function getModalContent() {
		if (loading) {
			return (
				<>
					<ActivityIndicator size="small" color="#333" />
					<Text>Loading categories...</Text>
				</>
			);
		}

		if (error) {
			return (
				<>
					<Text style={[styles.messageText, styles.errorText]}>
						Error loading categories: {error.message}
					</Text>
				</>
			);
		}

		return (
			<ScrollView>
				{categories.map((category) => (
					<Pressable
						key={category.id}
						style={styles.dropdownItem}
						onPress={() => {
							onSelect(category);
							setIsOpen(false);
						}}
					>
						<Text style={styles.itemText}>{category.name}</Text>
					</Pressable>
				))}
			</ScrollView>
		);
	}

	return (
		<>
			<TouchableOpacity
				style={styles.dropdownTrigger}
				onPress={() => setIsOpen(!isOpen)}
			>
				<Text style={styles.selectedText}>
					{selectedCategory?.name || "Select a category"}
				</Text>
				{!error && <Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>}
			</TouchableOpacity>

			{error && (
				<Text style={styles.errorText}>
					Category selection unavailable: {error.message}
				</Text>
			)}

			<Modal
				visible={isOpen}
				transparent
				animationType="fade"
				onRequestClose={() => setIsOpen(false)}
			>
				<Pressable
					style={styles.modalBackdrop}
					onPress={() => setIsOpen(false)}
				>
					<View style={styles.dropdownList}>{getModalContent()}</View>
				</Pressable>
			</Modal>
		</>
	);
}

// Add these styles:
const styles = StyleSheet.create({
	dropdownTrigger: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 5,
		padding: 10,
	},
	selectedText: {
		color: "#333",
		fontSize: 16,
	},
	arrow: {
		fontSize: 12,
		color: "#666",
	},
	modalBackdrop: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	dropdownList: {
		backgroundColor: "white",
		width: "70%",
		borderRadius: 5,
		maxHeight: 300,
	},
	dropdownItem: {
		padding: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#eee",
	},
	itemText: {
		fontSize: 16,
		color: "#333",
	},
	errorBorder: {
		borderColor: "#ff4444",
	},
	errorText: {
		color: "#ff4444",
		fontSize: 14,
		marginTop: 4,
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	messageText: {
		fontSize: 16,
		color: "#666",
		marginTop: 8,
		textAlign: "center",
	},
});
