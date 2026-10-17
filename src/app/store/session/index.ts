import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import nookies from 'nookies';

import getUserGroupText from '@/app/utils/get-user-group-text';

import { remind, login, registration, update } from './thunks';
import { SessionType } from './type';

export const initialState: SessionType = {
  user: null,
  token: null,
  error: null,
  errorSave: null,
  registrationError: null,
  isAdmin: false,
  isTaskmaster: false,
  isBuilder: false,
  isMasurer: false,
  isSalon: false,
  isWaitSave: false,
  isRegistrationWait: false,
  wait: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    exit: (state) => {
      state.token = null;
      state.user = null;
      state.isAdmin = false;
      state.isTaskmaster = false;
      state.isBuilder = false;
      state.isMasurer = false;
      state.isSalon = false;
      nookies.destroy(null, 'token', { path: '/' });
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(remind.pending, (state) => {
      state.wait = true;
    });
    builder.addCase(remind.fulfilled, (state, action) => {
      state.wait = false;
      state.error = null;

      if (action.payload) {
        state.isAdmin = false;
        state.isTaskmaster = false;
        state.isBuilder = false;
        state.isMasurer = false;
        state.isSalon = false;

        const group = getUserGroupText(action.payload.user.GROUP_ID);
        if (group === 'Aдминистратор') state.isAdmin = true;
        if (group === 'Бригадир') state.isTaskmaster = true;
        if (group === 'Сборщик') state.isBuilder = true;
        if (group === 'Замерщик') state.isMasurer = true;
        if (group === 'Салон') state.isSalon = true;

        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    });
    builder.addCase(remind.rejected, (state, action) => {
      state.wait = false;
      state.error = action.payload as string;
    });

    builder.addCase(login.pending, (state) => {
      state.wait = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.wait = false;
      state.error = null;

      if (action.payload) {
        state.isAdmin = false;
        state.isTaskmaster = false;
        state.isBuilder = false;
        state.isMasurer = false;
        state.isSalon = false;

        const group = getUserGroupText(action.payload.user.GROUP_ID);
        if (group === 'Aдминистратор') state.isAdmin = true;
        if (group === 'Бригадир') state.isTaskmaster = true;
        if (group === 'Сборщик') state.isBuilder = true;
        if (group === 'Замерщик') state.isMasurer = true;
        if (group === 'Салон') state.isSalon = true;

        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.wait = false;
      state.error = action.payload as string;
    });

    builder.addCase(registration.pending, (state) => {
      state.isRegistrationWait = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isRegistrationWait = false;
      state.registrationError = null;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isRegistrationWait = false;
      state.registrationError = action.payload as string;
    });

    builder.addCase(update.pending, (state) => {
      state.isWaitSave = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.isWaitSave = false;
      state.errorSave = null;
    });
    builder.addCase(update.rejected, (state, action) => {
      state.isWaitSave = false;
      state.errorSave = action.payload as string;
    });
  },
});

export default sessionSlice.reducer;

export const { exit, clearError } = sessionSlice.actions;
