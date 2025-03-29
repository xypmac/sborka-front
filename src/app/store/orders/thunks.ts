import { createAsyncThunk } from '@reduxjs/toolkit';
import nookies from 'nookies';
import { format } from 'date-fns';

import { API, SERVER_ERRORS } from '@/app/utils/constants';

export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id: string, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      formData.append('ID', id);

      const response = await fetch(`${API}/orders/getById`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        return { ...data.message };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        console.error(data.message);
        return rejectWithValue('Не удалось получить данные заказа.');
      }
    } catch (e) {
      return rejectWithValue('Не удалось получить данные заказа.');
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (
    {
      ID,
      props,
    }: {
      ID: string;
      props: {
        PRICE_APP: string;
        STATUS: string;
        DATE_WORK: string;
        DATE_END_WORK: string;
        DATE_CANCEL_WORK: string;
        PRICE: string;
        WORKER: string;
        SALON: string;
        MEASURER: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(props);
      let formData = new FormData();
      formData.append('ID', ID);
      formData.append(`PROPS[PRICE_APP]`, props.PRICE_APP);
      props.PRICE && formData.append(`PROPS[PRICE]`, props.PRICE);
      typeof props.WORKER === 'string' &&
        formData.append(`PROPS[WORKER]`, props.WORKER);
      typeof props.SALON === 'string' &&
        formData.append(`PROPS[SALON]`, props.SALON);
      typeof props.MEASURER === 'string' &&
        formData.append(`PROPS[MEASURER]`, props.MEASURER);
      formData.append(`PROPS[STATUS]`, String(props.STATUS));
      props.DATE_WORK !== '' &&
        formData.append(
          `PROPS[DATE_WORK]`,
          format(new Date(props.DATE_WORK), 'dd.MM.yyyy')
        );
      props.DATE_END_WORK !== '' &&
        formData.append(
          `PROPS[DATE_END_WORK]`,
          format(new Date(props.DATE_END_WORK), 'dd.MM.yyyy')
        );
      props.DATE_CANCEL_WORK !== '' &&
        formData.append(
          `PROPS[DATE_CANCEL_WORK]`,
          format(new Date(props.DATE_CANCEL_WORK), 'dd.MM.yyyy')
        );

      const response = await fetch(`${API}/orders/update`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        return { ...data.message };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        console.error(data.message);
        return rejectWithValue('Не удалось обновить заказ.');
      }
    } catch (e) {
      return rejectWithValue('Не удалось обновить заказ.');
    }
  }
);

export const addComment = createAsyncThunk(
  '/orders/addComment',
  async (
    {
      ID,
      comment,
      isSalon = false,
    }: { ID: number; comment: string; isSalon?: boolean },
    { rejectWithValue }
  ) => {
    try {
      let formData = new FormData();
      formData.append('ID', String(ID));

      isSalon
        ? formData.append('PROPS[COMMENT_SALON]', comment)
        : formData.append('PROPS[COMMENT_WORKER]', comment);

      const response = await fetch(`${API}/orders/addComments`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        return { data: { ...data.message }, isSalon };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        console.error(data.message);
        return rejectWithValue('Не удалось добавить комментарий');
      }
    } catch (e) {
      return rejectWithValue('Не удалось добавить комментарий');
    }
  }
);

export const getOrders = createAsyncThunk(
  '/orders/getOrders',
  async (
    data: {
      currentPage?: number;
    } | null,
    { getState, rejectWithValue }
  ) => {
    try {
      const state: any = getState();
      const { orders } = state;
      const currentPage = data ? data.currentPage : orders.currentPage;

      let formData = new FormData();
      formData.append('select[]', 'ORDER_ID');
      formData.append('select[]', 'FIO');
      formData.append('select[]', 'PHONE_CLIENT');
      formData.append('select[]', 'ADDRESS');
      formData.append('select[]', 'STATUS');
      formData.append('offset', currentPage);
      formData.append('limit', '10');

      // фильтр по номеру
      const id = orders.filter.id || null;
      id && formData.append('filter[ORDER_ID]', id);

      // фильтр по имени
      const name = orders.filter.name || null;
      name && formData.append('filter[FIO]', name);

      // фильтр по статусу
      const status = orders.filter.status || null;
      status && status !== '10' && formData.append('filter[STATUS]', status);

      // фильтр по дaте
      const date = orders.filter.date || null;
      date && formData.append('filter[DATE_WORK]', date);

      const response = await fetch(`${API}/orders/getList`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        const orders = [];

        for (var key in data.message.items) {
          if (data.message.items.hasOwnProperty(key)) {
            orders.push(data.message.items[key]);
          }
        }

        return {
          orders,
          total: data.message.totalCount,
          page: currentPage + 1,
          isFirstLoad: currentPage === 0,
        };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        console.error(data.message);
        return rejectWithValue('Не удалось получить список заказов');
      }
    } catch (e) {
      return rejectWithValue('Не удалось получить список заказов');
    }
  }
);

export const addFile = createAsyncThunk(
  '/orders/addFile',
  async (
    { ID, file, type }: { ID: number; file: any; type: string },
    { rejectWithValue }
  ) => {
    try {
      let formData = new FormData();
      formData.append('ID', String(ID));

      if (type === 'PHOTO_ROOM') formData.append('PHOTO_ROOM[]', file);
      if (type === 'SKETCH') formData.append('SKETCH[]', file);
      if (type === 'PHOTO_REPORT') formData.append('PHOTO_REPORT[]', file);
      if (type === 'MEASURING') formData.append('MEASURING[]', file);

      // formData.append('DOCS[]', file);

      const response = await fetch(`${API}/orders/addFile`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        return { ...data.message, type };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        console.error(data.message);
        return rejectWithValue('Не удалось добавить файл');
      }
    } catch (e) {
      return rejectWithValue('Не удалось добавить файл');
    }
  }
);
