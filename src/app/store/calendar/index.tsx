import { createSlice } from '@reduxjs/toolkit';

import { CalendarType } from './type';
import { getCalendarUsers, getCalendarOrders } from './thunks';

export const initialState: CalendarType = {
  wait: false,
  waitOrders: false,
  error: null,
  errorOrder: null,
  users: [],
  orders: [],
  currentPage: 0,
  currentPageOrders: 0,
  usersTotal: 0,
  ordersTotal: 0,
  sort: {
    name: 'date',
    dir: 'DESC',
  },
  filter: {
    date: '',
  },
  filterOrders: {},
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
      state.waitOrders = initialState.waitOrders;
      state.error = initialState.error;
      state.errorOrder = initialState.errorOrder;
      state.users = initialState.users;
      state.orders = initialState.orders;
      state.currentPage = initialState.currentPage;
      state.currentPageOrders = initialState.currentPageOrders;
      state.usersTotal = initialState.usersTotal;
      state.usersTotal = initialState.ordersTotal;
      state.filter = initialState.filter;
      state.filterOrders = initialState.filterOrders;
    },
    setFilter(state, action) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    setOrderFilter(state, action) {
      state.filterOrders = {
        ...state.filterOrders,
        ...action.payload,
      };
    },
    setOrderSort(state, action) {
      console.log(action.payload);
      state.sort = { ...state.sort, ...action.payload };
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

    builder.addCase(getCalendarOrders.pending, (state) => {
      state.waitOrders = true;
    });
    builder.addCase(getCalendarOrders.fulfilled, (state, action) => {
      state.waitOrders = false;
      state.errorOrder = null;

      if (action.payload?.isFirstLoad) {
        state.orders = action.payload?.orders || [];
      } else {
        const copyState = JSON.parse(JSON.stringify(state));
        const prevOrders = copyState.orders;
        const orders = action.payload?.orders || [];

        state.orders = [...prevOrders, ...orders];
      }

      state.currentPageOrders = action.payload?.page || 0;
      state.ordersTotal = action.payload?.total || 0;
    });
    builder.addCase(getCalendarOrders.rejected, (state, action) => {
      state.waitOrders = false;
      state.errorOrder = action.payload as string;
    });
  },
});

export default usersSlice.reducer;

export const {
  clearError,
  setFilter,
  setOrderFilter,
  setOrderSort,
  clearState,
  updateUsers,
} = usersSlice.actions;
