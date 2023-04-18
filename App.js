// system
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";

// fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// components
import LoginScreen from "./screens/authScreens/LoginScreen";
import RegistrationScreen from "./screens/authScreens/RegistrationScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
	// load fonts
	const [fontsLoaded] = useFonts({
		"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
		"Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	onLayoutRootView();

	return (
		<>
			{/* <LoginScreen /> */}
			<RegistrationScreen />
			<StatusBar style="auto" />
		</>
	);
}
