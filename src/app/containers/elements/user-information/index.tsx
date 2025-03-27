'use client';

import { useEffect, useState } from 'react';
import nookies from 'nookies';
import { useDispatch } from 'react-redux';

import UserInformationComponent from '@/app/components/elements/user-information';
import { API, SERVER_OK } from '@/app/utils/constants';
import { User as UserType } from '@/app/store/users/type';
import { AppDispatch } from '@/app/store';
import { updateUsers } from '@/app/store/users';
import getStringNumber from '@/app/utils/get-string-number';

import { UserInformationProps } from './types';

export default function UserInformation({ id, onHide }: UserInformationProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitUpdating, setIsWaitUpdating] = useState(false);
  const [user, setUser] = useState<null | UserType>(null);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let formData = new FormData();
    formData.append('ID', id);

    fetch(`${API}/users/getById`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${nookies.get().token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (SERVER_OK.includes(response.code)) setUser(response.message);
        else setError('Не удалось получить данные пользователя');
      })
      .catch(() => setError('Не удалось получить данные пользователя'))
      .finally(() => setIsLoading(false));
  }, []);

  const onActiveUserHandler = () => {
    setIsWaitUpdating(true);

    let formData = new FormData();
    formData.append('ID', id);

    fetch(`${API}/users/setActive`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${nookies.get().token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (SERVER_OK.includes(response.code)) {
          const currentUser: UserType = user as any;
          dispatch(updateUsers({ id, active: 'Y' }));
          setUser({ ...currentUser, ACTIVE: response.message.ACTIVE });
        } else setError('Не удалось активировать пользователя');
      })
      .catch(() => setError('Не удалось активировать пользователя'))
      .finally(() => setIsWaitUpdating(false));
  };

  const onUpdateUserHandler = ({
    id,
    phone,
    address,
  }: {
    id: string;
    phone: string;
    address: string;
  }) => {
    setIsWaitUpdating(true);
    console.log(id);
    let formData = new FormData();
    formData.append(`ID`, id);
    formData.append(`PROPS[PHONE_NUMBER]`, getStringNumber(phone));
    address && formData.append(`PROPS[WORK_STREET]`, address);

    fetch(`${API}/users/update`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${nookies.get().token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (SERVER_OK.includes(response.code)) {
          dispatch(updateUsers({ id, phone: getStringNumber(phone), address }));
        } else setError('Не удалось обновить данные пользователя');
      })
      .catch(() => setError('Не удалось обновить данные пользователя'))
      .finally(() => setIsWaitUpdating(false));
  };

  return (
    <UserInformationComponent
      isLoading={isLoading}
      isWaitUpdating={isWaitUpdating}
      onActiveUser={onActiveUserHandler}
      onUpdateUser={onUpdateUserHandler}
      error={error}
      user={user}
      onHide={onHide}
    />
  );
}
