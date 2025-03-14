import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LOCALSTORAGE_TOKEN_PATH } from '../../api';
import {
  AuthCredentials,
  AuthMeResponse,
  AuthSignInResponse,
} from '@lance/shared/models/api/auth';
import { AuthAPI } from '../../api/routers/auth';

type SliceState = {
  token: string | null;
  me: AuthMeResponse | null;
};

const initialState: SliceState = {
  token: null,
  me: null,
};

const login = createAsyncThunk<AuthSignInResponse, AuthCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await AuthAPI.login(credentials);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const fetchMe = createAsyncThunk<AuthMeResponse>(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthAPI.me();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      window.localStorage.removeItem(LOCALSTORAGE_TOKEN_PATH);
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { token } = action.payload;

      window.localStorage.setItem(LOCALSTORAGE_TOKEN_PATH, token);
      state.token = token;
    });

    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.me = action.payload;
    });
  },
});

export const AuthActions = { ...authSlice.actions, fetchMe, login };

export default authSlice.reducer;
