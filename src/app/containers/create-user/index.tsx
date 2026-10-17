'use client';

import { useState, useEffect } from 'react';
import nookies from 'nookies';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Form from '@/app/components/forms/create-user';
import { API, SERVER_OK } from '@/app/utils/constants';
import getStringNumber from '@/app/utils/get-string-number';
import { RootState } from '@/app/store';

export default function CreateUser() {
  const [error, setError] = useState('');
  const [isWait, setIsWait] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const { isMasurer, isBuilder, isSalon, sessionWait } = useSelector((state: RootState) => ({
    isMasurer: state.session.isMasurer,
    isBuilder: state.session.isBuilder,
    isSalon: state.session.isSalon,
    sessionWait: state.session.wait,
  }));

  useEffect(() => {
    if (sessionWait) return;
    if (isMasurer || isBuilder || isSalon) router.replace('/');
  }, [isMasurer, isBuilder, isSalon, sessionWait]);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => router.push('/users/'), 2000);
    return () => clearTimeout(timer);
  }, [success]);

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
        if (SERVER_OK.includes(response.code)) setSuccess(true);
        else setError(response.message.replaceAll('<br>', ''));
      })
      .catch((e) => {
        setError('Не удалось создать пользователя!');
      })
      .finally(() => setIsWait(false));
  };

  return (
    <MainLayout>
      {success ? (
        <p>Пользователь успешно зарегистрирован. Переход на список пользователей...</p>
      ) : (
        <Form onCreateUser={onCreateUserHandler} isWait={isWait} error={error} />
      )}
    </MainLayout>
  );
}
