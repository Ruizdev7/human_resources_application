import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {

    access_level: {
        Type_Relationship: null,
        area: null,
        process: null,
        role: null,
        ccn_role: null,
        loading: false,
        error: null,
        success: false,
    },
    current_user: {
        ccn_employee: null,
        token: null,
        full_name_employee: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.current_user.ccn_employee = action.payload.current_user.ccn_employee
            state.current_user.token = action.payload.current_user.token
            state.current_user.full_name_employee = action.payload.current_user.full_name_employee
            state.current_user.informed_consent_law_1581 = action.payload.current_user.informed_consent_law_1581
            state.access_level.Type_Relationship = action.payload.access_level.Type_Relationship
            state.access_level.area = action.payload.access_level.area
            state.access_level.process = action.payload.access_level.process
            state.access_level.role = action.payload.access_level.role
            state.access_level.ccn_role = action.payload.access_level.ccn_role
            state.access_level.loading = false
            state.access_level.error = false
            state.access_level.success = true
        },
        setInformedConsentLaw1581: (state, action) => {
            state.current_user.informed_consent_law_1581 = "1"
        },
        cleanCredentials: (state) => {
            state.current_user.ccn_employee = null
            state.current_user.token = null
            state.current_user.full_name_employee = null
            state.current_user.informed_consent_law_1581 = null
            state.access_level.Type_Relationship = null
            state.access_level.area = null
            state.access_level.process = null
            state.access_level.role = null
            state.access_level.loading = false
            state.access_level.error = null
            state.access_level.success = false
        },
    },
});

export const { setCredentials, cleanCredentials, setInformedConsentLaw1581 } = authSlice.actions;

export default authSlice.reducer;