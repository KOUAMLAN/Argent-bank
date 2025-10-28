import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginApi, fetchUserProfileApi, updateUserProfileApi } from '../services/api';
import { LoginCredentials, UserProfileUpdate } from '../services/api';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: 'idle',
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
        try {
            const token = await loginApi(credentials);
            dispatch(fetchUserProfile(token));
            return { token };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (token: string, { rejectWithValue }) => {
        try {
            const user = await fetchUserProfileApi(token);
            return { user };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async (profileData: UserProfileUpdate, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState() as { auth: AuthState };
            if (!auth.token) {
                return rejectWithValue('No token found');
            }
            const updatedUser = await updateUserProfileApi(auth.token, profileData);
            return { user: updatedUser };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            state.loading = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
                state.token = action.payload.token;
                state.loading = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
                state.loading = 'succeeded';
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;