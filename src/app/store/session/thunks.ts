import { createAsyncThunk } from '@reduxjs/toolkit';
import nookies from 'nookies';

import { API, SERVER_ERRORS } from '@/app/utils/constants';
import getStringNumber from '@/app/utils/get-string-number';

const setToken = (token: string) => {
  const cookieMaxAge = 365 * 24 * 60 * 60;

  nookies.set(null, 'token', token, {
    maxAge: cookieMaxAge,
    path: '/',
  });
};

export const remind = createAsyncThunk(
  'session/remind',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API}/getuserbytoken`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${nookies.get().token || ''} `,
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        return {
          token: nookies.get().token,
          user: { ...data.message },
        };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        return rejectWithValue(data.message);
      }
    } catch (e) {
      return rejectWithValue('Что-то пошло не так! Попробуйте еще раз!');
    }
  }
);

export const login = createAsyncThunk(
  'session/login',
  async (
    { login, password }: { login: string; password: string },
    { rejectWithValue }
  ) => {
    let formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);

    try {
      const response = await fetch(`${API}/auth`, {
        method: 'post',
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        const { Authorization, user } = data.message;

        setToken(Authorization);

        return {
          token: Authorization,
          user: { ...user },
        };
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        return rejectWithValue(data.message);
      }
    } catch (e) {
      return rejectWithValue('Что-то пошло не так! Попробуйте еще раз!');
    }
  }
);

export const registration = createAsyncThunk(
  'session/registration',
  async (
    {
      type,
      login,
      password,
      passwordConfirm,
      phone,
      email,
      address,
      partner,
      fio,
    }: {
      type: string[];
      login: string;
      password: string;
      passwordConfirm: string;
      phone: string;
      email: string;
      partner?: string;
      address?: string;
      fio?: string;
    },
    { rejectWithValue }
  ) => {
    let formData = new FormData();

    type.forEach((element, index) => {
      formData.append(`GROUP_ID[${index}]`, element);
    });

    formData.append('LOGIN', login);
    formData.append('PASSWORD', password);
    formData.append('CONFIRM_PASSWORD', passwordConfirm);
    formData.append('PHONE_NUMBER', getStringNumber(phone));
    formData.append('EMAIL', email);

    partner && formData.append('WORK_COMPANY', partner);
    address && formData.append('WORK_STREET', address);
    fio && formData.append('NAME', fio);

    try {
      const response = await fetch(`${API}/registration`, {
        method: 'post',
        body: formData,
      });

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        return rejectWithValue(data.message);
      }
    } catch (e) {
      return rejectWithValue('Что-то пошло не так! Попробуйте еще раз!');
    }
  }
);

export const update = createAsyncThunk(
  'session/update',
  async (
    { phone, address }: { phone: string; address?: string },
    { rejectWithValue }
  ) => {
    let formData = new FormData();

    formData.append(`PROPS[PHONE_NUMBER]`, getStringNumber(phone));
    address && formData.append(`PROPS[WORK_STREET]`, address);

    try {
      const response = await fetch(`${API}/users/update`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        return rejectWithValue(data.message);
      }
    } catch (e) {
      return rejectWithValue('Что-то пошло не так! Попробуйте еще раз!');
    }
  }
);

export const getForCurrent = createAsyncThunk(
  'session/getForCurrent',
  async (
    { year, month }: { year: string; month: string },
    { rejectWithValue }
  ) => {
    let formData = new FormData();

    formData.append(`PROPS[YEARS]`, year);
    formData.append(`PROPS[MONTH]`, month);

    try {
      const response = await fetch(`${API}/calendar/getForCurrent`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${nookies.get().token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
      }

      if (SERVER_ERRORS.includes(response.status)) {
        const data = await response.json();
        return rejectWithValue(data.message);
      }
    } catch (e) {
      return rejectWithValue('Что-то пошло не так! Попробуйте еще раз!');
    }
  }
);
