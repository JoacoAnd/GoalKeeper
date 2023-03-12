import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ASYNC THUNKS 

const registerThunk = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
    
});


export interface IAuthState {
    token: string | null;
    email: string | null;
    username: string | null;
};

const initialState: IAuthState = {
    token: null,
    email: null,
    username: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
});

export default authSlice.reducer;
