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
	Platform,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Keyboard,
} from "react-native";

// assets
const backgroundImage = require("../../images/background.png");

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (value) => setEmail(value);
	const handlePasswordChange = (value) => setPassword(value);

	const handleFormSubmit = () => {
		if (email.trim() === "" || password.trim() === "") {
			Alert.alert("Заполните все поля");
			return;
		}

		console.log("email", email, "password", password);
		setEmail("");
		setPassword("");
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<ImageBackground source={backgroundImage} style={styles.image}>
					<KeyboardAvoidingView
						behavior={Platform.OS == "ios" ? "padding" : "height"}
						style={styles.form}
					>
						<Text style={styles.header}>Войти</Text>

						<TextInput
							value={email}
							onChangeText={handleEmailChange}
							placeholderTextColor="#BDBDBD"
							placeholder="Адрес электронной почты"
							keyboardType="email-address"
							autoCapitalize="none"
							style={styles.input}
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
						<TouchableOpacity
							activeOpacity={0.7}
							title={"login"}
							style={styles.button}
							onPress={handleFormSubmit}
						>
							<Text style={styles.text}>Войти</Text>
						</TouchableOpacity>

						<Text onPress={() => {}} style={styles.info}>
							Нет аккаунта? Зарегистрироваться
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
		width: "100%",
		justifyContent: "flex-end",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 16,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
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
		backgroundColor: "#F6F6F6",
		paddingHorizontal: 16,
		marginRight: 16,
		marginLeft: 16,
		marginTop: 16,
		height: 50,
		borderRadius: 10,
		fontFamily: "Roboto-Regular",
	},

	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 16,
		borderRadius: 100,
		backgroundColor: "#FF6C00",
		marginRight: 16,
		marginLeft: 16,
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
		marginBottom: 110,
		fontFamily: "Roboto-Regular",
	},
	buttonWrapper: {
		width: "100%",
		justifyContent: "flex-end",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 16,
	},
});

export default LoginScreen;
