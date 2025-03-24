import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ClientsAPI } from '../../api/routers/clients';

type SliceState = {
  names: Record<string, string>;
};

const initialState: SliceState = {
  names: {},
};

const fetchNames = createAsyncThunk(
  '/clients/names',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ClientsAPI.getNameDictionary();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNames.fulfilled, (state, action) => {
      state.names = action.payload;
    });
  },
});

export const ClientActions = { fetchNames };
