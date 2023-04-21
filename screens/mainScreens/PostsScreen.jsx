// navigation
import { createStackNavigator } from "@react-navigation/stack";

// components
import DefaultScreen from "../nestedScreens/DefaultScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
	return (
		<NestedScreen.Navigator>
			<NestedScreen.Screen
				options={{ headerShown: false }}
				name="Default"
				component={DefaultScreen}
			/>
			<NestedScreen.Screen
				options={{ headerShown: false }}
				name="Map"
				component={MapScreen}
			/>
			<NestedScreen.Screen
				options={{
					headerShown: false,
					cardStyle: {
						backgroundColor: "red",
					},
				}}
				name="Comments"
				component={CommentsScreen}
			/>
		</NestedScreen.Navigator>
	);
};

export default PostsScreen;
