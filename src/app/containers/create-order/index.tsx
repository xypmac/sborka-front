'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import nookies from 'nookies';

import { AppDispatch, RootState } from '@/app/store';
import MainLayout from '@/app/layouts/main-layout';
import { API, SERVER_OK } from '@/app/utils/constants';
import CreateOrderForm from '@/app/components/forms/create-order';

export default function CreateOrder() {
  const { isSalon } = useSelector((state: RootState) => ({
    isSalon: state.session.isSalon,
  }));

  const [error, setError] = useState('');
  const [isWait, setIsWait] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const onCreateOrderHandler = (data: any) => {
    const { name, phone, address, price, comment } = data;

    let formData = new FormData();
    formData.append(`PROPS[ADDRESS]`, address);
    formData.append(`PROPS[FIO]`, name);
    formData.append(`PROPS[PHONE_CLIENT]`, phone);
    formData.append(`PROPS[PRICE_APP]`, price);
    comment && formData.append(`PROPS[COMMENT_SALON]`, comment);

    fetch(`${API}/orders/add`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${nookies.get().token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (SERVER_OK.includes(response.code)) {
        } else {
          setError('Не удалось создать заказ');
        }
      })
      .catch(() => setError('Не удалось создать заказ'))
      .finally(() => setIsWait(false));
  };

  return (
    <MainLayout>
      <CreateOrderForm onCreateOrder={onCreateOrderHandler} isSalon={isSalon} />
      ;
    </MainLayout>
  );
}
