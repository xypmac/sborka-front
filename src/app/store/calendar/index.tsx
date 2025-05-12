import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CalendarType } from './type';
import { getCalendarUsers } from './thunks';

export const initialState: CalendarType = {
  wait: false,
  error: null,
  users: [],
  currentPage: 0,
  usersTotal: 0,
  filter: {
    date: '',
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
    builder.addCase(getCalendarUsers.pending, (state) => {
      state.wait = true;
    });
    builder.addCase(getCalendarUsers.fulfilled, (state, action) => {
      state.wait = false;
      state.error = null;

      state.users = action.payload?.users || [];
      state.currentPage = action.payload?.page || 0;
    });
    builder.addCase(getCalendarUsers.rejected, (state, action) => {
      state.wait = false;
      state.error = action.payload as string;
    });
  },
});

export default usersSlice.reducer;

export const { clearError, setFilter, clearState, updateUsers } =
  usersSlice.actions;
