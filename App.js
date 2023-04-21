// system
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";

// redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// components
import Main from "./screens/components/Main";

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
		<Provider store={store}>
			<Main />
			<StatusBar style="auto" />
		</Provider>
	);
}
