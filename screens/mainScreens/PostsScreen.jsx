// system
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// icons
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";

// assets
const avatar = require("../../images/ken.png");

const PostsScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Публикации</Text>

				<TouchableOpacity
					style={styles.logoutIcon}
					activeOpacity={0.8}
					onPress={() => {}}
				>
					<Feather
						name="log-out"
						size={24}
						color="rgba(189, 189, 189, 1)"
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.userContainer}>
				<Image source={avatar} style={styles.avatar} />

				<View style={styles.userInfo}>
					<Text style={styles.userName}>Kaneki Ken</Text>
					<Text style={styles.userEmail}>tokyoghoul@mail.com</Text>
				</View>
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
	logoutIcon: {
		position: "absolute",
		paddingHorizontal: 16,
		top: 54,
		right: 0,
	},
	userContainer: {
		display: "flex",
		marginTop: 32,
		marginHorizontal: 16,
		flexDirection: "row",
	},
	avatar: {
		width: 60,
		height: 60,
		resizeMode: "cover",
		borderRadius: 16,
		marginRight: 8,
	},
	userInfo: {
		justifyContent: "center",
	},
	userName: {
		fontFamily: "Roboto-Bold",
		fontSize: 13,
		lineHeight: 15,
		color: "#212121",
	},
	userEmail: {
		fontFamily: "Roboto-Regular",
		fontSize: 11,
		lineHeight: 13,
		color: "rgba(33, 33, 33, 0.8)",
	},
});

export default PostsScreen;
