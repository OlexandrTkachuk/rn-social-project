// system
import { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	KeyboardAvoidingView,
	TextInput,
	Alert,
	Pressable,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";

// icons + assets
import { Ionicons } from "@expo/vector-icons";
const backgroundImage = require("../../images/background.png");

const RegistrationScreen = ({ navigation }) => {
	const [login, setLogin] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const isEmpty =
		login.trim() === "" || email.trim() === "" || password.trim() === "";

	const handleLoginChange = (value) => setLogin(value);
	const handleEmailChange = (value) => setEmail(value);
	const handlePasswordChange = (value) => setPassword(value);

	const handleAddProfileAvatar = () => {
		Alert.alert("Yare Yare Daze..!");
	};

	const clearForm = () => {
		setLogin("");
		setEmail("");
		setPassword("");
	};

	const handleFormSubmit = () => {
		if (isEmpty) {
			Alert.alert("Заполните все поля");
			return;
		}

		console.log("login", login, "email", email, "password", password);

		clearForm();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<ImageBackground source={backgroundImage} style={styles.image}>
					<KeyboardAvoidingView
						behavior={Platform.OS == "ios" ? "padding" : "height"}
						style={styles.form}
					>
						<View
							style={[
								styles.box,
								{
									transform: [{ translateX: -35 }],
								},
							]}
						>
							<View style={styles.iconContainer}>
								<Ionicons
									name="ios-add-circle-outline"
									size={36}
									color="#FF6C00"
									onPress={handleAddProfileAvatar}
								/>
							</View>
						</View>

						<Text style={styles.header}>Регистрация</Text>

						<TextInput
							value={login}
							onChangeText={handleLoginChange}
							placeholderTextColor="#BDBDBD"
							placeholder="Логин"
							style={styles.input}
						/>

						<TextInput
							value={email}
							onChangeText={handleEmailChange}
							placeholderTextColor="#BDBDBD"
							placeholder="Адрес электронной почты"
							style={styles.input}
							keyboardType="email-address"
							autoCapitalize="none"
						/>

						<TextInput
							value={password}
							onChangeText={handlePasswordChange}
							placeholder="Пароль"
							placeholderTextColor="#BDBDBD"
							secureTextEntry={true}
							style={{
								...styles.input,
								marginBottom: 30,
							}}
						/>
					</KeyboardAvoidingView>

					<View style={styles.buttonWrapper}>
						<Pressable
							on
							title={"login"}
							style={styles.button}
							onPress={handleFormSubmit}
						>
							<Text style={styles.text}>Регистрация</Text>
						</Pressable>
						<Text
							onPress={() => navigation.navigate("Login")}
							style={styles.info}
						>
							Уже есть аккаунт ? Войти
						</Text>
					</View>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	form: {
		justifyContent: "flex-end",
		backgroundColor: "#FFFFFF",
		width: "100%",
		paddingTop: 60,
		paddingHorizontal: 16,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		position: "relative",
	},
	header: {
		color: "#212121",
		fontWeight: 500,
		fontSize: 30,
		alignSelf: "center",
		marginTop: 32,
		marginBottom: 16,
		fontFamily: "Roboto-Medium",
	},
	input: {
		width: "100%",
		backgroundColor: "#F6F6F6",
		paddingHorizontal: 16,
		marginTop: 16,
		height: 50,
		borderRadius: 10,
		fontFamily: "Roboto-Regular",
	},

	button: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 16,
		borderRadius: 100,
		backgroundColor: "#FF6C00",
		marginTop: 13,
	},
	text: {
		fontSize: 16,
		lineHeight: 18,
		color: "white",
		fontFamily: "Roboto-Regular",
	},
	info: {
		fontSize: 16,
		lineHeight: 18,
		color: "#1B4371",
		marginTop: 16,
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 80,
		fontFamily: "Roboto-Regular",
	},

	box: {
		position: "absolute",
		top: -60,
		left: "48%",
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
	buttonWrapper: {
		width: "100%",
		justifyContent: "flex-end",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 16,
		position: "relative",
	},
});

export default RegistrationScreen;
