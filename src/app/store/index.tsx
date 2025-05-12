import { configureStore } from '@reduxjs/toolkit';

import sessionSlice from './session';
import usersSlice from './users';
import ordersSlice from './orders';
import calendarSlice from './calendar';

export const store = configureStore({
  reducer: {
    session: sessionSlice,
    users: usersSlice,
    orders: ordersSlice,
    calendar: calendarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
