import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOCALSTORAGE_TOKEN_PATH } from '../../api';
import { AuthCredentials, AuthMeResponse } from '@lance/shared/models/api/auth';
import { AuthAPI } from '../../api/routers/auth';

type SliceState = {
  me: AuthMeResponse | null;
};

const initialState: SliceState = {
  me: null,
};

const login = createAsyncThunk<string, AuthCredentials>(
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
    logout: (state) => {
      state.me = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.me = action.payload;
    });

    builder.addCase(fetchMe.rejected, (state) => {
      window.localStorage.removeItem(LOCALSTORAGE_TOKEN_PATH);
      state.me = null;
    });
  },
});

export const AuthActions = { ...authSlice.actions, fetchMe, login };

export default authSlice.reducer;
