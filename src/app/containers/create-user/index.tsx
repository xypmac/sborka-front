'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import nookies from 'nookies';
import { useRouter } from 'next/navigation';

import MainLayout from '@/app/layouts/main-layout';
import Form from '@/app/components/forms/create-user';
import { AppDispatch } from '@/app/store';
import { API, SERVER_OK } from '@/app/utils/constants';
import getStringNumber from '@/app/utils/get-string-number';

export default function CreateUser() {
  const [error, setError] = useState('');
  const [isWait, setIsWait] = useState(false);

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onCreateUserHandler = (data: any) => {
    let formData = new FormData();
    formData.append(`LOGIN`, data.login);
    formData.append(`EMAIL`, data.email);
    formData.append(`PHONE_NUMBER`, getStringNumber(data.phone));
    formData.append(`GROUP_ID[]`, data.type);
    formData.append(`PASSWORD`, data.password);
    formData.append(`CONFIRM_PASSWORD`, data.passwordConfirm);

    data.fio && formData.append('NAME', data.fio);
    data.partner && formData.append('WORK_COMPANY', data.partner);
    data.address && formData.append('WORK_STREET', data.address);

    setIsWait(true);

    fetch(`${API}/users/add`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${nookies.get().token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (SERVER_OK.includes(response.code)) {
          router.push(`/users/`);
        } else {
          setError(response.message.replaceAll('<br>', ''));
        }
      })
      .catch((e) => {
        setError('Не удалось создать пользователя!');
      })
      .finally(() => setIsWait(false));
  };

  return (
    <MainLayout>
      <Form onCreateUser={onCreateUserHandler} isWait={isWait} error={error} />
    </MainLayout>
  );
}
