import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nookies from 'nookies';
import axios from 'axios';

type SessionType = {
  wait: boolean;
  token: string | null;
  error: string | null;
};

export const initialState: SessionType = {
  token: null,
  error: null,
  wait: false,
};

const saveToken = (token: string) => {
  const cookieMaxAge = 365 * 24 * 60 * 60;

  nookies.set(null, 'token', token, {
    maxAge: cookieMaxAge,
    path: '/',
    domain: 'localhost',
  });
};

export const login = createAsyncThunk(
  'session/login',
  async (data: any, { getState }) => {
    console.log(data);

    const res = await axios({
      method: 'get',
      url: 'https://fakerapi.it/api/v2/persons',
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone',
      },
    });
    console.log(res);
    if (res.data.code === 200) {
      saveToken('s');
    }
  }
);

export const registration = createAsyncThunk(
  'session/registration',
  async (data: any) => {
    console.log(data);
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
    builder.addCase(login.fulfilled, (state, action) => {
      state.wait = false;
      state.error = null;
      state.token = 'sdf';
    });
    builder.addCase(login.rejected, (state) => {
      state.wait = false;
      state.error = 'Что-то пошло не так! Попробуйте еще раз!';
    });

    builder.addCase(registration.pending, (state) => {
      state.wait = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.wait = false;
      state.error = null;
    });
    builder.addCase(registration.rejected, (state) => {
      state.wait = false;
      state.error = 'Что-то пошло не так! Попробуйте еще раз!';
    });
  },
});

export default sessionSlice.reducer;
