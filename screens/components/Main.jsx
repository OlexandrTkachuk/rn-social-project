// system
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// navigation
import { NavigationContainer } from "@react-navigation/native";

// redux
import { authStateChangeUser } from "../../redux/auth/auth-actions";
import { selectStateChange } from "../../redux/auth/auth-selectors";

// component
import useRoute from "../../router";

const Main = () => {
	const dispatch = useDispatch();
	const stateChange = useSelector(selectStateChange);

	useEffect(() => {
		dispatch(authStateChangeUser());
	});

	const routing = useRoute(stateChange);

	return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
