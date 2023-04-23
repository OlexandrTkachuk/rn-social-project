// system
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native";

// firebase
import firebase from "../../firebase/config";

// image picker
import * as ImagePicker from "expo-image-picker";

// redux
import {
	selectUserId,
	selectUserPhoto,
	selectUserName,
} from "../../redux/auth/auth-selectors";
import { authSignOutUser } from "../../redux/auth/auth-actions";

// icons
import { Feather   } from "@expo/vector-icons";

// assets
const backgroundImage = require("../../images/background.png");

const ProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const [posts, setPosts] = useState([]);

	const userId = useSelector(selectUserId);
	const userName = useSelector(selectUserName);
	const userPhoto = useSelector(selectUserPhoto);

	useEffect(() => {
		getUserPosts();
	}, []);

	const getUserPosts = async () => {
		await firebase
			.firestore()
			.collection("Posts")
			.where("userId", "==", userId)
			.onSnapshot((data) =>
				setPosts(
					data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
				)
			);
	};

	const signOut = () => {
		dispatch(authSignOutUser());
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={backgroundImage} style={styles.image}>
				<View style={styles.postsContainer}>
					<Text style={styles.userProfileName}>{userName}</Text>

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

					<View
						style={[
							styles.box,
							{
								transform: [{ translateX: -35 }],
							},
						]}
					>
						<ImageBackground
							style={[
								styles.boxPhoto,
								{
									overflow: "hidden",
								},
							]}
							source={{
								uri: userPhoto,
							}}
						/>
					</View>

					<FlatList
						style={styles.posts}
						data={posts}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<View style={styles.gallery}>
								<View style={styles.galleryPost}>
									<Image
										source={{ uri: item.photo }}
										style={styles.postImage}
									/>

									<Text style={styles.postName}>
										{item.name}
									</Text>

									<View style={styles.postInfo}>
										<TouchableOpacity
											activeOpacity={0.8}
											style={styles.commentWrapper}
											onPress={() =>
												navigation.navigate(
													"Comments",
													{
														postId: item.id,
														image: item.photo,
													}
												)
											}
										>
											<Feather
												name="message-circle"
												size={28}
												color="#FF6C00"
												style={styles.commentIcon}
											/>

											<Text style={styles.commentText}>
												13
											</Text>

											<Feather
												name="thumbs-up"
												size={24}
												color="#FF6C00"
											/>

											<Text style={styles.likeText}>
												200
											</Text>
										</TouchableOpacity>

										<TouchableOpacity
											activeOpacity={0.8}
											style={styles.locationWrapper}
											onPress={() =>
												navigation.navigate("Map", {
													geo: item.geo,
												})
											}
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
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	image: {
		flex: 1,
		resizeMode: "center",
	},
	posts: {
		marginBottom: 200,
	},
	postsContainer: {
		backgroundColor: "#fff",
		marginTop: 160,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	userProfileName: {
		marginTop: 92,
		textAlign: "center",
		marginBottom: 33,
		fontFamily: "Roboto-Medium",
		fontSize: 30,
		lineHeight: 35,
		color: "#212121",
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
		color: "#212121",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
		marginRight: 24,
	},
	locationText: {
		color: "#212121",
		textDecorationLine: "underline",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
	},
	logoutIcon: {
		position: "absolute",
		paddingHorizontal: 16,
		top: 22,
		right: 0,
	},
	box: {
		position: "absolute",
		top: -60,
		left: "45%",
		width: 120,
		height: 120,
		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	boxPhoto: {
		width: 120,
		height: 120,
		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	iconContainer: {
		position: "absolute",
		bottom: 13,
		right: -19,
	},
	commentIcon: {
		color: "#FF6C00",
	},
	likeText: {
		marginLeft: 6,
		color: "#212121",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
	},
});

export default ProfileScreen;
