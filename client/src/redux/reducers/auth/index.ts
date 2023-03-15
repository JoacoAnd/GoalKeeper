import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, login } from "../../api";
import { Values } from "../../../pages/Auth";

// ASYNC THUNKS 

export const registerThunk = createAsyncThunk("auth/register", async (formData: Values, thunkAPI) => {
    try {
        return await register(formData);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error;
        return thunkAPI.rejectWithValue(message);
    };
});

export const loginThunk = createAsyncThunk("auth/login", async (formData: Values, thunkAPI) => {
    try {
        return await login(formData);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error;
        return thunkAPI.rejectWithValue(message);
    };
});

/* --------------------- */

export interface IUser {
    token: string | null;
    email: string | null;
    username: string | null;
}

export interface IAuthState {
    user: IUser | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
};

let user = JSON.parse(localStorage.getItem("user") || "{}");
user = Object.entries(user).length > 0 ? user : null;

const initialState: IAuthState = {
    user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
        // REGISTER
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
                state.user = null;
            })
        // REGISTER
        .addCase(loginThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = String(action.payload);
            state.user = null;
        })
        }
});

export default authSlice.reducer;
export const { reset, logout } = authSlice.actions;