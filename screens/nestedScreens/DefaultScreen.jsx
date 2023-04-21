// system
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Image,
} from "react-native";

// redux
import { authSignOutUser } from "../../redux/auth/auth-actions";

// firebase
import firebase from "../../firebase/config";

// icons
import { Feather } from "@expo/vector-icons";

// assets
const avatar = require("../../images/ken.png");

const DefaultScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [posts, setPosts] = useState([]);

	const getAllPosts = async () => {
		await firebase
			.firestore()
			.collection("Posts")
			// .orderBy("date")
			.onSnapshot((data) => {
				setPosts(
					data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
				);
			});
	};

	useEffect(() => {
		getAllPosts();
	}, []);

	const signOut = () => {
		dispatch(authSignOutUser());
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Публикации</Text>

				<TouchableOpacity
					style={styles.logoutIcon}
					activeOpacity={0.8}
					onPress={signOut}
				>
					<Feather
						name="log-out"
						size={24}
						color="rgba(189, 189, 189, 1)"
					/>
				</TouchableOpacity>
			</View>

			<FlatList
				data={posts}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.gallery}>
						<View style={styles.userContainer}>
							<Image
								source={{ uri: item.userPhoto }}
								style={styles.avatar}
							/>

							<View style={styles.userInfo}>
								<Text style={styles.userName}>
									{item.userName}
								</Text>

								<Text style={styles.userEmail}>
									tokyoghoul@mail.com
								</Text>
							</View>
						</View>

						<View style={styles.galleryPost}>
							<Image
								source={{ uri: item.photo }}
								style={styles.postImage}
							/>

							<Text style={styles.postName}>{item.name}</Text>

							<View style={styles.postInfo}>
								<TouchableOpacity
									style={styles.commentWrapper}
									onPress={() =>
										navigation.navigate("Comments")
									}
								>
									<Feather
										name="message-circle"
										size={24}
										color="#BDBDBD"
										style={styles.commentIcon}
									/>

									<Text style={styles.commentText}>0</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={styles.locationWrapper}
									onPress={() => navigation.navigate("Map")}
								>
									<Feather
										name="map-pin"
										size={24}
										color="#BDBDBD"
										style={styles.locationIcon}
									/>

									<Text style={styles.locationText}>
										{item.location}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			/>
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
	gallery: {
		marginHorizontal: 16,
	},
	galleryPost: {
		marginTop: 32,
	},
	postImage: {
		height: 240,
		borderRadius: 8,
		marginBottom: 8,
	},
	postName: {
		fontFamily: "Roboto-Medium",
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
		marginBottom: 8,
	},
	postInfo: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	commentWrapper: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	locationWrapper: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	commentText: {
		color: "#BDBDBD",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
	},
	locationText: {
		color: "#212121",
		textDecorationLine: "underline",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
	},
});

export default DefaultScreen;
