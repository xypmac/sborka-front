import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { OrdersType } from './type';
import {
  addComment,
  getOrderById,
  getOrders,
  updateOrder,
  addFile,
} from './thunks';

export const initialState: OrdersType = {
  list: [],
  error: null,
  currentOrder: null,
  currentPage: 0,
  total: 0,
  isWait: false,
  isWaitUpdate: false,
  filter: {
    id: '',
    name: '',
    status: '',
    date: '',
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearState(state) {
      state.isWait = initialState.isWait;
      state.error = initialState.error;
      state.list = initialState.list;
      state.currentPage = initialState.currentPage;
      state.total = initialState.total;
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
    builder.addCase(getOrderById.pending, (state) => {
      state.isWait = true;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.isWait = false;
      state.error = null;

      if (action.payload) {
        const dateWork = action.payload.DATE_WORK
          ? action.payload.DATE_WORK.split('.')
          : null;

        const dateEndWord = action.payload.DATE_END_WORK
          ? action.payload.DATE_END_WORK.split('.')
          : null;

        const dateCancelWork = action.payload.DATE_CANCEL_WORK
          ? action.payload.DATE_CANCEL_WORK.split('.')
          : null;

        state.currentOrder = {
          ...action.payload,
          DATE_WORK: dateWork
            ? `${dateWork[1]}.${dateWork[0]}.${dateWork[2]}`
            : '',
          DATE_END_WORK: dateEndWord
            ? `${dateEndWord[1]}.${dateEndWord[0]}.${dateEndWord[2]}`
            : '',
          DATE_CANCEL_WORK: dateCancelWork
            ? `${dateCancelWork[1]}.${dateCancelWork[0]}.${dateCancelWork[2]}`
            : '',
          COMMENT_SALON: action.payload.COMMENT_SALON
            ? Object.values(action.payload.COMMENT_SALON)
            : [],
          COMMENT_WORKER: action.payload.COMMENT_WORKER
            ? Object.values(action.payload.COMMENT_WORKER)
            : [],
          PHOTO_ROOM: action.payload.PHOTO_ROOM
            ? Object.values(action.payload.PHOTO_ROOM)
            : [],
          PHOTO_REPORT: action.payload.PHOTO_REPORT
            ? Object.values(action.payload.PHOTO_REPORT)
            : [],
          SKETCH: action.payload.SKETCH
            ? Object.values(action.payload.SKETCH)
            : [],
          MEASURING: action.payload.MEASURING
            ? Object.values(action.payload.MEASURING)
            : [],
        };
      }
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.isWait = false;
      state.error = action.payload as string;
    });

    builder.addCase(getOrders.pending, (state) => {
      state.isWait = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isWait = false;
      state.error = null;

      if (action.payload?.isFirstLoad) {
        state.list = action.payload?.orders || [];
      } else {
        const copyState = JSON.parse(JSON.stringify(state));
        const prevOrders = copyState.list;
        const orders = action.payload?.orders || [];

        state.list = [...prevOrders, ...orders];
      }

      state.currentPage = action.payload?.page || 0;
      state.total = action.payload?.total || 0;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isWait = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateOrder.pending, (state) => {
      state.isWaitUpdate = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.isWaitUpdate = false;
      state.error = null;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.isWaitUpdate = false;
      state.error = action.payload as string;
    });

    builder.addCase(addComment.pending, (state) => {
      state.isWait = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isWait = false;
      state.error = null;

      if (action.payload) {
        const copyState = JSON.parse(JSON.stringify(state));

        if (action.payload.isSalon) {
          state.currentOrder = {
            ...copyState.currentOrder,
            COMMENT_SALON: Object.values(action.payload.data.COMMENT_SALON),
          };
        } else {
          state.currentOrder = {
            ...copyState.currentOrder,
            COMMENT_WORKER: Object.values(action.payload.data.COMMENT_WORKER),
          };
        }
      }
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.isWait = false;
      state.error = action.payload as string;
    });

    builder.addCase(addFile.pending, (state) => {
      state.isWait = true;
    });
    builder.addCase(addFile.fulfilled, (state, action) => {
      state.isWait = false;
      state.error = null;

      if (action.payload) {
        const copyState = JSON.parse(JSON.stringify(state));

        state.currentOrder = {
          ...copyState.currentOrder,
          [action.payload.type]: action.payload[action.payload.type]
            ? Object.values(action.payload[action.payload.type])
            : [],
        };
      }
    });
    builder.addCase(addFile.rejected, (state, action) => {
      state.isWait = false;
      state.error = action.payload as string;
    });
  },
});

export default ordersSlice.reducer;

export const { clearError, setFilter, clearState } = ordersSlice.actions;
