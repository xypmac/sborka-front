import { createAsyncThunk } from '@reduxjs/toolkit';
import nookies from 'nookies';
import { format } from 'date-fns';

import { API, SERVER_ERRORS, SERVER_OK } from '@/app/utils/constants';

export const getCalendarUsers = createAsyncThunk(
  '/users/getCalendarUsers',
  async (
    data: {
      date: string;
      name?: string;
      group?: string;
      status?: string;
    } | null,
    { getState, rejectWithValue }
  ) => {
    try {
      const state: any = getState();
      const { calendar } = state;

      let formData = new FormData();

      formData.append(
        'calendar[DATE]',
        data ? data.date : format(new Date(), 'dd.MM.yyyy')
      );
      formData.append('offset', '0');
      formData.append('limit', '999');

      data && data.name && formData.append('filter[NAME]', data.name);
      data && data.group && formData.append('filter[GROUP_ID]', data.group);

      data && data.status && formData.append('calendar[STATUS]', data.status);

      const response = await fetch(`${API}/users/getCalendar`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        const users = [];

        for (var key in data.message.items) {
          if (data.message.items.hasOwnProperty(key)) {
            users.push(data.message.items[key]);
          }
        }

        return {
          users: users.map(
            (user: {
              ID: number;
              NAME: string;
              GROUP_ID: string;
              days: { STATUS_ID: string };
            }) => {
              return {
                id: user.ID,
                name: user.NAME,
                group: user.GROUP_ID,
                day: user.days.STATUS_ID,
              };
            }
          ),
          page: calendar.currentPage + 1,
        };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        console.error(data.message);
        return rejectWithValue('Не удалось получить список пользователей');
      }
    } catch (e) {
      console.log(e);
      return rejectWithValue('Не удалось получить список пользователей');
    }
  }
);

export const getCalendarOrders = createAsyncThunk(
  '/users/getCalendarOrders',
  async (
    data: {
      currentPage?: number;
    } | null,
    { getState, rejectWithValue }
  ) => {
    try {
      const state: any = getState();
      const { calendar } = state;
      const offset = data ? data.currentPage : calendar.currentPageOrders;

      let formData = new FormData();
      formData.append('select[]', 'ORDER_ID');
      formData.append('select[]', 'FIO');
      formData.append('select[]', 'PHONE_CLIENT');
      formData.append('select[]', 'ADDRESS');
      formData.append('select[]', 'STATUS');
      formData.append('select[]', 'DATE_WORK');
      formData.append('limit', '7');
      formData.append('offset', offset);

      // фильтр по номеру
      if (calendar.filterOrders.searchType && calendar.filterOrders.search) {
        if (calendar.filterOrders.searchType === '1') {
          formData.append('filter[ORDER_ID]', calendar.filterOrders.search);
        }
        if (calendar.filterOrders.searchType === '2') {
          formData.append('filter[FIO]', calendar.filterOrders.search);
        }
        if (calendar.filterOrders.searchType === '3') {
          formData.append('filter[ADDRESS]', calendar.filterOrders.search);
        }
      }

      calendar.filterOrders.status &&
        calendar.filterOrders.status !== '10' &&
        formData.append('filter[STATUS]', calendar.filterOrders.status);

      calendar.filterOrders.dateTo &&
        formData.append('filter[DATE_WORK][TO]', calendar.filterOrders.dateTo);

      calendar.filterOrders.dateFrom &&
        formData.append(
          'filter[DATE_WORK][FROM]',
          calendar.filterOrders.dateFrom
        );

      if (calendar.sort.name === 'date') {
        formData.append('order[DATE_WORK]', calendar.sort.dir);
      }

      if (calendar.sort.name === 'status') {
        formData.append('order[STATUS]', calendar.sort.dir);
      }

      const response = await fetch(`${API}/orders/getList`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (SERVER_OK.includes(response.status)) {
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
          page: offset + 1,
          isFirstLoad: offset === 0,
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
