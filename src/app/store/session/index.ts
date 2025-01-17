import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type SessionType = {
  token: string;
  wait: boolean;
  errors: string | null;
};

export const initialState: SessionType = {
  token: '',
  wait: false,
  errors: null,
};

export const login = createAsyncThunk(
  'session/login',
  async (data: any, { getState }) => {
    console.log(data);
    try {
      const a = await axios({
        method: 'get',
        url: 'https://fakerapi.it/apdi/v2/persons',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone',
        },
      });

      console.log(a);
    } catch (e) {
      console.error(e);
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.wait = true;
    });
    builder.addCase(login.rejected, (state) => {
      console.log('s');
      state.wait = false;
      state.errors = 'error';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.wait = false;
      state.errors = null;
      state.token = 'sdf';
    });
  },
});

export default sessionSlice.reducer;
