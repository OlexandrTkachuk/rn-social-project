// system
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// icons
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

const MapScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Карта</Text>

				<TouchableOpacity
					style={styles.arrowleftIcon}
					activeOpacity={0.8}
					onPress={() => {
						navigation.navigate("Default");
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
	},
});

export default MapScreen;
