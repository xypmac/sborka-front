'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import nookies from 'nookies';
import { useRouter } from 'next/navigation';

import MainLayout from '@/app/layouts/main-layout';
import Form from '@/app/components/forms/create-order';
import { RootState } from '@/app/store';
import { API, SERVER_OK, SERVER_ERRORS_TEXT } from '@/app/utils/constants';

export default function CreateOrder() {
  const { isSalon } = useSelector((state: RootState) => ({
    isSalon: state.session.isSalon,
  }));

  const [error, setError] = useState('');
  const [isWait, setIsWait] = useState(false);

  const router = useRouter();

  const onCreateOrderHandler = (data: any) => {
    const {
      name,
      phone,
      address,
      price,
      comment,
      id,
      roomPhotos,
      sketchPhotos,
      sizePhotos,
    } = data;
    setIsWait(true);

    let formData = new FormData();
    formData.append(`PROPS[ADDRESS]`, address);
    formData.append(`PROPS[FIO]`, name);
    formData.append(`PROPS[PHONE_CLIENT]`, phone);
    formData.append(`PROPS[PRICE_APP]`, price);
    formData.append(`PROPS[ORDER_ID]`, id);

    sketchPhotos.forEach((element: File, index: number) => {
      formData.append(`SKETCH[${index}]`, element);
    });

    roomPhotos &&
      roomPhotos.forEach((element: File, index: number) => {
        formData.append(`PHOTO_ROOM[${index}]`, element);
      });

    sizePhotos &&
      sizePhotos.forEach((element: File, index: number) => {
        formData.append(`MEASURING[${index}]`, element);
      });

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
          router.push(`/orders/${response.message.ORDER_ID}`);
        } else {
          if (response.message === SERVER_ERRORS_TEXT.ORDER_EXIST) {
            setError(response.message);
          } else {
            setError(
              'Не удалось создать заказ! Попробуйте еще раз или перезагрузите страницу'
            );
          }
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
      <Form
        onCreateOrder={onCreateOrderHandler}
        isSalon={isSalon}
        isWait={isWait}
        error={error}
      />
    </MainLayout>
  );
}
