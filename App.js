// system
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";

// fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const routing = useRoute({});

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
		<NavigationContainer>
			{routing}
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}
