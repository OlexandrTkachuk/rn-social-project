// system
import { View, Text, StyleSheet, ImageBackground } from "react-native";

// assets
const backgroundImage = require("../../images/background.png");

const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={backgroundImage}
				style={styles.image}
			></ImageBackground>
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
		resizeMode: "contain",
	},
});

export default ProfileScreen;
