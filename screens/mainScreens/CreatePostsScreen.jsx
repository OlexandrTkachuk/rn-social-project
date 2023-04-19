// system
import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Alert,
	Platform,
	Keyboard,
	ImageBackground,
	KeyboardAvoidingView,
	TextInput,
} from "react-native";

// icons
import { AntDesign } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Создать публикацию</Text>

				<TouchableOpacity
					style={styles.arrowleftIcon}
					activeOpacity={0.8}
					onPress={() => {
						navigation.navigate("Posts");
					}}
				>
					<AntDesign
						name="arrowleft"
						size={24}
						color="rgba(33, 33, 33, 0.8)"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	header: {
		position: "relative",
		paddingTop: 55,
		paddingBottom: 11,
		borderBottomWidth: 1,
		borderBottomColor: "#BDBDBD",
	},
	headerText: {
		textAlign: "center",
		fontFamily: "Roboto-Medium",
		fontSize: 17,
		lineHeight: 22,
		color: "#212121",
	},
	arrowleftIcon: {
		position: "absolute",
		paddingHorizontal: 16,
		top: 54,
		// left: 16,
	},
});

export default CreatePostsScreen;
