import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    
    // add state-changing functions
    reducers: 
    {
        // signIn reducers
        signInStart: (state) => { state.loading = true },
        signInSuccess: (state, action) => 
        {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFaliure: (state, action) => 
        {
            state.loading = false;
            state.error = action.payload;
        },

        // signOut reducers
        signOutStart: (state) => { state.loading = true },
        signOutSuccess: (state) => 
        {
            state.loading = false,
            state.currentUser = null,
            state.error = null
        },
        signOutFaliure: (state, action) => 
        {
            state.loading = false,
            state.error = action.payload
        },
    }
});

export const { signInStart, signInSuccess, signInFaliure, signOutStart, signOutSuccess, signOutFaliure } = userSlice.actions;
export default userSlice.reducer;