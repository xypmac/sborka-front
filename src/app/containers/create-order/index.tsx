'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import nookies from 'nookies';
import { useRouter } from 'next/navigation';

import Loader from '@/app/components/elements/loader';
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

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onCreateOrderHandler = (data: any) => {
    const {
      name,
      phone,
      address,
      price,
      comment,
      roomPhotos,
      sketchPhotos,
      sizePhotos,
    } = data;

    let formData = new FormData();
    formData.append(`PROPS[ADDRESS]`, address);
    formData.append(`PROPS[FIO]`, name);
    formData.append(`PROPS[PHONE_CLIENT]`, phone);
    formData.append(`PROPS[PRICE_APP]`, price);

    roomPhotos.forEach((element: File, index: number) => {
      formData.append(`PHOTO_ROOM[${index}]`, element);
    });

    sketchPhotos.forEach((element: File, index: number) => {
      formData.append(`SKETCH[${index}]`, element);
    });

    sizePhotos.forEach((element: File, index: number) => {
      formData.append(`MEASURING[${index}]`, element);
    });

    comment && formData.append(`PROPS[COMMENT_SALON]`, comment);

    setIsWait(true);

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
          router.push(`/orders/${response.message.ORDER_ID}`);
        } else {
          setError(
            'Не удалось создать заказ! Попробуйте еще раз или перезагрузите страницу'
          );
        }
      })
      .catch(() =>
        setError(
          'Не удалось создать заказ! Попробуйте еще раз или перезагрузите страницу'
        )
      )
      .finally(() => setIsWait(false));
  };

  return (
    <MainLayout>
      <CreateOrderForm
        onCreateOrder={onCreateOrderHandler}
        isSalon={isSalon}
        isWait={isWait}
        error={error}
      />
    </MainLayout>
  );
}
