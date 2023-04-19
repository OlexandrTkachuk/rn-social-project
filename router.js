// system
import React from "react";

// navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// components auth
import LoginScreen from "./screens/authScreens/LoginScreen";
import RegistrationScreen from "./screens/authScreens/RegistrationScreen";

// components main
import PostsScreen from "./screens/mainScreens/PostsScreen";
import CreatePostsScreen from "./screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreens/ProfileScreen";

// icons
import { Ionicons, SimpleLineIcons, Feather } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
	if (!isAuth) {
		return (
			<AuthStack.Navigator>
				<AuthStack.Screen
					options={{ headerShown: false }}
					name="Login"
					component={LoginScreen}
				/>

				<AuthStack.Screen
					options={{ headerShown: false }}
					name="Registration"
					component={RegistrationScreen}
				/>
			</AuthStack.Navigator>
		);
	}

	return (
		<MainTab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					borderTopColor: "#212121",
					boxShadow: "0px -0.5px 0px rgba(0, 0, 0, 0.3)",
					backdropFilter: "blur(13.5914px)",
					backgroundColor: "#FFFFFF",
					paddingTop: 9,
					paddingHorizontal: 80,
				},
			}}
		>
			<MainTab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) => (
						<SimpleLineIcons
							name="grid"
							size={24}
							color="rgba(33, 33, 33, 0.8)"
						/>
					),
				}}
				name="Posts"
				component={PostsScreen}
			/>

			<MainTab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) => (
						<Ionicons name="add" size={24} color="#FFFFFF" />
					),
					tabBarItemStyle: {
						backgroundColor: "#FF6C00",
						borderRadius: 20,
						marginHorizontal: 15,
					},
					// tabBarStyle: { display: "none" },
				}}
				name="Create"
				component={CreatePostsScreen}
			/>

			<MainTab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) => (
						<Feather
							name="user"
							size={24}
							color="rgba(33, 33, 33, 0.8)"
						/>
					),
				}}
				name="Profile"
				component={ProfileScreen}
			/>
		</MainTab.Navigator>
	);
};

export default useRoute;
