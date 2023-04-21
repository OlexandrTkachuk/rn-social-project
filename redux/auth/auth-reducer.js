import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userId: null,
	userName: "",
	stateChange: false,
	userPhoto: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		updateUserProfile: (state, action) => ({
			...state,
			userId: action.payload.userId,
			userName: action.payload.userName,
			userPhoto: action.payload.userPhoto,
		}),
		authStateChange: (state, action) => ({
			...state,
			stateChange: action.payload.stateChange,
		}),
		authSignOut: () => initialState,
	},
});
