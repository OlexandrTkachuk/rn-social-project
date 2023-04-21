import firebase from "../../firebase/config";
import { authSlice } from "./auth-reducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignIn =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			const user = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
		} catch (error) {
			alert(error);
		}
	};

export const authSignUp =
	({ userName, email, password, userPhoto }) =>
	async (dispatch, getState) => {
		try {
			await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);

			const user = firebase.auth().currentUser;

			await user.updateProfile({
				displayName: userName,
				photoURL: userPhoto,
			});

			const { displayName, uid, photoURL } = firebase.auth().currentUser;

			const userUpdateProfile = {
				userName: displayName,
				userId: uid,
				userPhoto: photoURL,
			};

			dispatch(updateUserProfile(userUpdateProfile));
		} catch (error) {
			alert(error.message);
		}
	};

export const authSignOutUser = () => async (dispatch, getState) => {
	await firebase.auth().signOut();
	dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
	await firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			const userUpdateProfile = {
				userName: user.displayName,
				userId: user.uid,
				userPhoto: user.photoURL,
			};

			dispatch(authStateChange({ stateChange: true }));
			dispatch(updateUserProfile(userUpdateProfile));
		}
	});
};
