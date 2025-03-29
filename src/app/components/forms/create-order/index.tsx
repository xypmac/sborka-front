'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import { AppDispatch } from '@/app/store';
import getPhoneFormat from '@/app/utils/get-phone-number';

import schema from './schema';
import { CreateOrderProps, Fields } from './types';
import styles from './styles.module.scss';

export default function CreateOrder({
  onCreateOrder,
  isSalon,
}: CreateOrderProps) {
  const dispatch: AppDispatch = useDispatch();

  const [isWait, setIsWait] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      address: '',
      price: '',
      name: '',
      phone: '',
      comment: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onCreateOrder)}>
      <p className={styles.caption}> Создать заказ</p>

      <div className={styles.items}>
        <div className={styles.item}>
          <p className={styles.label}>Стоимость</p>
          <Input
            name='price'
            placeholder='Стоимость'
            register={register}
            error={errors.price?.message || null}
            onChange={(value) => {
              setValue('price', value.replace(/\D/, ''), {
                shouldValidate: true,
              });
            }}
          />
        </div>
        <div className={styles.item}>
          <p className={styles.label}>ФИО клиента</p>
          <Input
            name='name'
            placeholder='ФИО клиета'
            register={register}
            error={errors.name?.message || null}
            onChange={(e) => false}
          />
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Номер клиента</p>
          <Input
            name='phone'
            placeholder='Номер клиента'
            register={register}
            error={errors.phone?.message || null}
            onChange={(value) =>
              setValue('phone', getPhoneFormat(value), {
                shouldValidate: true,
              })
            }
          />
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Адрес клиента</p>
          <Input
            name='address'
            placeholder='Адрес клиента'
            register={register}
            error={errors.address?.message || null}
            onChange={(e) => false}
          />
        </div>
        {isSalon && (
          <div className={styles.item}>
            <p className={styles.label}>Комментарий</p>
            <Input
              name='comment'
              placeholder='Комментарий'
              register={register}
              error={errors.comment?.message || null}
              onChange={(e) => false}
            />
          </div>
        )}
      </div>
      <Button
        text='Сохранить'
        type='submit'
        isDisabled={Object.keys(errors).length !== 0}
      />
    </form>
  );
}
