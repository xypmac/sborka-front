import { configureStore } from '@reduxjs/toolkit';

import sessionSlice from './session';
import usersSlice from './users';
import ordersSlice from './orders';

export const store = configureStore({
  reducer: { session: sessionSlice, users: usersSlice, orders: ordersSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
