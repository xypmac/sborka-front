import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UsersType } from './types';
import { getUsers, setActive } from './thunks';

export const initialState: UsersType = {
  isWait: false,
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
      state.isWait = initialState.isWait;
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
    updateUsers(state, action) {
      const copyState = JSON.parse(JSON.stringify(state));
      const { users } = copyState;

      const newUsers = users.map((user: { ID: string }) => {
        if (user.ID === action.payload.id) {
          const data: any = {};

          if (action.payload.phone) data.PHONE_NUMBER = action.payload.phone;
          if (action.payload.address) data.WORK_STREET = action.payload.address;
          if (action.payload.active) data.ACTIVE = action.payload.active;

          return {
            ...user,
            ...data,
          };
        } else return user;
      });

      return {
        ...state,
        users: newUsers,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isWait = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isWait = false;
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
      state.isWait = false;
      state.error = action.payload as string;
    });

    builder.addCase(setActive.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.users = state.users.map((u: any) =>
        u.ID === action.payload!.id ? { ...u, ACTIVE: action.payload!.active } : u
      );
    });
  },
});

export default usersSlice.reducer;

export const { clearError, setFilter, clearState, updateUsers } =
  usersSlice.actions;
