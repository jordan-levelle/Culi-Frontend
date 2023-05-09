import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	uid: "",
	provider: "",
	username: "",
	email: "",
	profilePicture: "",
	token: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuthenticated = action.payload.verified;
			state.uid = action.payload.uid;
			state.provider = action.payload.provider;
			state.username = action.payload.username;
			state.email = action.payload.email;
			state.profilePicture = action.payload.profilePicture;
			state.token = action.payload.token;
		},
		sendLogout: (state, _action) => {
			state.isAuthenticated = false;
			state.uid = "";
			state.provider = "";
			state.username = "";
			state.email = "";
			state.profilePicture = "";
			state.token = "";
		},
	},
});

const { setAuth, sendLogout } = authSlice.actions;

const selectAuthState = (state) => state.auth;

const selectIsAuthenticated = createSelector(
	selectAuthState,
	(auth) => auth.isAuthenticated,
);

const selectToken = createSelector(selectAuthState, (auth) => auth.token);

const selectProfile = createSelector(selectAuthState, (auth) => ({
	username: auth.username,
	email: auth.email,
	profilePicture: auth.profilePicture,
}));

export {
	setAuth,
	sendLogout,
	selectAuthState,
	selectIsAuthenticated,
	selectToken,
	selectProfile,
};

export default authSlice.reducer;
