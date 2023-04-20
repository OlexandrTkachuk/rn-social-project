// system
import { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ImageBackground,
	Platform,
	Keyboard,
	KeyboardAvoidingView,
	TextInput,
	Alert,
} from "react-native";

// image picker
import * as ImagePicker from "expo-image-picker";

// icons
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

// components
import CameraScreen from "../components/Camera";

const CreatePostsScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [photo, setPhoto] = useState(null);
	const [isKeyboardShown, setIsKeyboardShown] = useState(false);
	const [isActiveCamera, setIsActiveCamera] = useState(false);

	const condition = name.trim() !== "" && location.trim() !== "";

	const loadPhotoText = !isKeyboardShown && !photo;
	const changePhotoText = !isKeyboardShown && photo;

	useEffect(() => {
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setIsKeyboardShown(true);
		});

		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setIsKeyboardShown(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	const handleNameChange = (value) => setName(value);
	const handleLocationChange = (value) => setLocation(value);

	const clearForm = () => {
		setName("");
		setLocation("");
		setPhoto("");
	};

	const hideKeyboard = () => {
		setIsKeyboardShown(false);
		Keyboard.dismiss();
	};

	const hideCamera = () => {
		setIsActiveCamera(false);
	};

	const getPhoto = (uri) => {
		setPhoto(uri);
		setIsActiveCamera(false);
	};

	const handleFormSubmit = async () => {
		if (name.trim() === "" || location.trim() === "") {
			Alert.alert("Заполните все поля");
			return;
		}

		clearForm();

		await navigation.navigate("Posts", { photo, name, location });
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		const source = result.assets[0].uri;

		setPhoto(source);
	};

	return !isActiveCamera ? (
		<TouchableWithoutFeedback onPress={hideKeyboard}>
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

				{!photo ? (
					<View
						style={{
							...styles.cameraContainer,
							marginBottom: isKeyboardShown ? 20 : 8,
						}}
					>
						<TouchableOpacity
							style={styles.cameraIconWrapper}
							activeOpacity={0.6}
							onPress={() => setIsActiveCamera(true)}
						>
							<MaterialIcons
								name="camera-alt"
								size={32}
								color="#BDBDBD"
							/>
						</TouchableOpacity>
					</View>
				) : (
					<ImageBackground
						style={{
							...styles.cameraContainer,
							overflow: "hidden",
							minHeight: 242,
							marginBottom: isKeyboardShown ? 20 : 8,
						}}
						source={{
							uri: photo,
						}}
					/>
				)}

				{loadPhotoText && (
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={pickImage}
						style={{
							...styles.cameraTextContainer,
							marginBottom: isKeyboardShown ? 20 : 48,
						}}
					>
						<Text style={styles.cameraText} onPress={pickImage}>
							Загрузите фото
						</Text>
					</TouchableOpacity>
				)}

				{changePhotoText && (
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => setIsActiveCamera(true)}
						style={{
							...styles.cameraTextContainer,
							marginBottom: isKeyboardShown ? 20 : 48,
						}}
					>
						<Text style={styles.cameraText}>
							Редактировать фото
						</Text>
					</TouchableOpacity>
				)}

				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					style={styles.form}
				>
					<View style={styles.inputContainer}>
						<TextInput
							value={name}
							onChangeText={handleNameChange}
							placeholder="Название..."
							placeholderTextColor="#BDBDBD"
							style={{ ...styles.input, ...styles.inputName }}
							onFocus={() => setIsKeyboardShown(true)}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Feather
							name="map-pin"
							size={24}
							color="#BDBDBD"
							style={{ marginRight: 8 }}
						/>

						<TextInput
							value={location}
							onChangeText={handleLocationChange}
							placeholder="Местность..."
							placeholderTextColor="#BDBDBD"
							style={{ ...styles.input, ...styles.inputLocation }}
							onFocus={() => setIsKeyboardShown(true)}
						/>
					</View>
				</KeyboardAvoidingView>

				<TouchableOpacity
					style={{
						...styles.btnSubmit,
						backgroundColor: condition ? "#FF6C00" : "#F6F6F6",
					}}
					activeOpacity={0.8}
					onPress={handleFormSubmit}
				>
					<Text
						style={{
							...styles.btnSubmitText,
							color: condition ? "#FFF" : "#BDBDBD",
						}}
					>
						Опубликовать
					</Text>
				</TouchableOpacity>

				<View style={styles.trashContainer}>
					<TouchableOpacity
						style={styles.btnTrash}
						activeOpacity={0.8}
						onPress={clearForm}
					>
						<Feather
							name="trash-2"
							size={24}
							color="#DADADA"
							style={styles.trashIcon}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	) : (
		<CameraScreen onClose={hideCamera} onSnap={getPhoto} />
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
	},
	cameraContainer: {
		marginTop: 32,
		marginHorizontal: 16,
		paddingVertical: 90,
		backgroundColor: "#F6F6F6",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	cameraIconWrapper: {
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
	},
	cameraTextContainer: {
		maxWidth: 220,
	},
	cameraText: {
		color: "#BDBDBD",
		marginHorizontal: 16,
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
	},
	photoIcon: {
		padding: 20,
		backgroundColor: "#FFF",
		borderRadius: 100,
		zIndex: 999,
	},
	form: {
		width: "100%",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 16,
	},
	input: {
		width: "100%",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
	},
	inputName: {
		fontFamily: "Roboto-Medium",
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
	},
	inputLocation: {
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
	},
	inputContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#E8E8E8",
		marginBottom: 32,
	},
	btnSubmit: {
		marginHorizontal: 16,
		backgroundColor: "#F6F6F6",
		paddingVertical: 16,
		borderRadius: 100,
		marginBottom: 120,
	},
	btnSubmitText: {
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
		textAlign: "center",
	},
	trashContainer: {
		display: "flex",
		alignItems: "center",
	},
	btnTrash: {
		paddingVertical: 8,
		paddingHorizontal: 23,
		backgroundColor: "#F6F6F6",
		borderRadius: 20,
	},
	trashIcon: {
		justifyContent: "center",
		textAlign: "center",
	},
});

export default CreatePostsScreen;
