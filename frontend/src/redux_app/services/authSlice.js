import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	access_level: {
		Type_Relationship: null,
		area: null,
		process: null,
		role: null,
	},
	current_user: {
		ccn_employee: null,
		token: null,
	},
};
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.current_user.ccn_employee = action.payload.current_user.ccn_employee
			state.current_user.token = action.payload.current_user.token
			state.access_level.Type_Relationship = action.payload.access_level.Type_Relationship
			state.access_level.area = action.payload.access_level.area
			state.access_level.process = action.payload.access_level.process
			state.access_level.role = action.payload.access_level.role
		},
		cleanCredentials: (state) => {
			state.current_user.ccn_employee = null
			state.current_user.token = null
			state.access_level.Type_Relationship = null
			state.access_level.area = null
			state.access_level.process = null
			state.access_level.role = null
		},
	},
});
export const { setCredentials, cleanCredentials } = authSlice.actions;

export default authSlice.reducer;