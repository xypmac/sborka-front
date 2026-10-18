import { createAsyncThunk } from '@reduxjs/toolkit';
import nookies from 'nookies';

import { API, SERVER_ERRORS } from '@/app/utils/constants';

export const setActive = createAsyncThunk(
  '/users/setActive',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      formData.append('ID', id);

      const response = await fetch(`${API}/users/setActive`, {
        method: 'post',
        body: formData,
        headers: { Authorization: `Bearer ${nookies.get().token}` },
      });

      if (response.status === 200) {
        const data = await response.json();
        return { id, active: data.message.ACTIVE };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        return rejectWithValue(data.message);
      }
    } catch (e) {
      return rejectWithValue('Не удалось изменить статус пользователя');
    }
  }
);

export const deleteUser = createAsyncThunk(
  '/users/delete',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('ID', id);

      const response = await fetch(`${API}/users/delete`, {
        method: 'post',
        body: formData,
        headers: { Authorization: `Bearer ${nookies.get().token}` },
      });

      if (response.status === 200) return { id };

      const data = await response.json();
      return rejectWithValue(data.message);
    } catch (e) {
      return rejectWithValue('Не удалось удалить пользователя');
    }
  }
);

export const getUsers = createAsyncThunk(
  '/users/getList',
  async (
    data:
      | {
          group?: string;
          active?: string;
          name?: string;
          currentPage?: number;
          isAll?: boolean;
        }
      | undefined,
    { getState, rejectWithValue }
  ) => {
    try {
      const state: any = getState();
      const { users } = state;
      const currentPage = data ? data.currentPage : users.currentPage;

      let formData = new FormData();
      formData.append('select[]', 'NAME');
      formData.append('select[]', 'LOGIN');
      formData.append('select[]', 'EMAIL');
      formData.append('select[]', 'ACTIVE');
      formData.append('select[]', 'GROUP_ID');
      formData.append('select[]', 'WORK_COMPANY');
      formData.append('select[]', 'WORK_STREET');
      formData.append('select[]', 'PHONE_NUMBER');
      formData.append('offset', currentPage);
      formData.append('limit', data?.isAll ? '100' : '10');

      // фильтр по группе
      const groupId = data?.group
        ? data.group === '0'
          ? null
          : data.group
        : null;

      const groupIdFromState = users.filter.group
        ? users.filter.group === '0'
          ? null
          : users.filter.group
        : null;

      (groupId || groupIdFromState) &&
        formData.append('filter[GROUP_ID]', groupId || groupIdFromState);

      // фильтр по имени
      const name = data?.name || users.filter.name || null;
      name && formData.append('filter[NAME]', name);

      // фильтр по активности
      const active = data?.active || users.filter.active || null;
      active &&
        active !== '3' &&
        formData.append('filter[ACTIVE]', active === '1' ? 'Y' : 'N');

      const response = await fetch(`${API}/users/getList`, {
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
          total: data.message.totalCount,
          page: currentPage + 1,
          isFirstLoad: currentPage === 0,
        };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        console.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (e) {
      return rejectWithValue('Не удалось получить список пользователей');
    }
  }
);
