import { createAsyncThunk } from '@reduxjs/toolkit';
import nookies from 'nookies';
import { format } from 'date-fns';

import { API, SERVER_ERRORS } from '@/app/utils/constants';

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

      if (data && data.status) {
        if (data.status === '12') formData.append('calendar[WORK]', 'true');
        else formData.append('calendar[STATUS]', data.status);
      }

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
          users,
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
