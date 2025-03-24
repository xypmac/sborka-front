import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UsersType } from './type';
import { getUserById, activeUserById, getUsers } from './thunks';

export const initialState: UsersType = {
  currentUser: null,
  wait: false,
  error: null,
  users: [],
  currentPage: 0,
  usersTotal: 0,
  filter: {
    name: '',
    group: '0',
    active: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearState(state) {
      state.currentUser = initialState.currentUser;
      state.wait = initialState.wait;
      state.error = initialState.error;
      state.users = initialState.users;
      state.currentPage = initialState.currentPage;
      state.usersTotal = initialState.usersTotal;
      state.filter = initialState.filter;
    },
    setFilter(state, action) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.wait = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.wait = false;
      state.error = null;

      if (action.payload) {
        state.currentUser = action.payload;
      }
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.wait = false;
      state.error = action.payload as string;
    });

    builder.addCase(activeUserById.pending, (state) => {
      state.wait = true;
    });
    builder.addCase(activeUserById.fulfilled, (state, action) => {
      state.wait = false;
      state.error = null;
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ACTIVE: 'Y' };
      }
    });
    builder.addCase(activeUserById.rejected, (state, action) => {
      state.wait = false;
      state.error = action.payload as string;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.wait = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.wait = false;
      state.error = null;

      if (action.payload?.isFirstLoad) {
        state.users = action.payload?.users || [];
      } else {
        const copyState = JSON.parse(JSON.stringify(state));
        const prevUsers = copyState.users;
        const users = action.payload?.users || [];

        state.users = [...prevUsers, ...users];
      }

      state.currentPage = action.payload?.page || 0;
      state.usersTotal = action.payload?.total || 0;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.wait = false;
      state.error = action.payload as string;
    });
  },
});

export default usersSlice.reducer;

export const { clearError, setFilter, clearState } = usersSlice.actions;
