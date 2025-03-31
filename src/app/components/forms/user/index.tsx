'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import Label from '@/app/components/elements/label';
import Error from '@/app/components/elements/error';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import Readonly from '@/app/components/elements/readonly';
import getUserGroupText from '@/app/utils/get-user-group-text';
import { AppDispatch } from '@/app/store';
import { clearError } from '@/app/store/users';
import getPhoneFormat from '@/app/utils/get-phone-number';
import { update } from '@/app/store/session/thunks';

import schema from './schema';
import { ProfileProps, Fields } from './types';
import styles from './styles.module.scss';

export default function User({
  user,
  serverError = null,
  isWide = false,
  isWait = false,
  isAllowEdit = false,
  onActiveUser,
  onUpdateUser,
}: ProfileProps) {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      phone: getPhoneFormat(user.PHONE_NUMBER),
      address: user.WORK_STREET || '',
      type: String(Object.keys(user.GROUP_ID)[0]),
    },
    resolver: yupResolver(schema),
  });
  getPhoneFormat;
  useEffect(() => {
    if (serverError) {
      const id = setTimeout(() => {
        dispatch(clearError());
      }, 10000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [serverError]);

  const onChangeHandler = (value: string, field: 'phone' | 'address') => {
    setValue(field, field === 'phone' ? getPhoneFormat(value) : value, {
      shouldValidate: true,
    });
  };

  const onSubmitHandler: SubmitHandler<Fields> = (data) => {
    if (onUpdateUser)
      onUpdateUser({
        phone: data.phone,
        address: data.address || '',
        id: user.ID,
      });
    else dispatch(update({ ...data, id: user.ID }));
  };

  return (
    <form
      className={cn(
        styles.content,
        isWait && styles.wait,
        isWide && styles.wide
      )}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <input {...register('type')} hidden />

      <div className={styles.header}>
        <p className={styles.type}>{getUserGroupText(user.GROUP_ID)}</p>
        <p className={styles.id}>ID: {user.ID}</p>
      </div>

      <div className={styles.item}>
        <Label>Логин</Label>
        <Readonly name='LOGIN' value={user.LOGIN} />
      </div>

      <div className={styles.item}>
        <Label>Почта</Label>
        <Readonly name='EMAIL' value={user.EMAIL} />
      </div>

      <div className={styles.item}>
        <Label>Телефон</Label>
        <Input
          name='phone'
          placeholder='Номер телефона'
          register={register}
          error={errors.phone?.message || null}
          onChange={onChangeHandler}
        />
      </div>

      {typeof user.WORK_COMPANY === 'string' && (
        <div className={styles.item}>
          <Label>Название контрагента</Label>
          <Readonly name='WORK_COMPANY' value={user.WORK_COMPANY} />
        </div>
      )}

      {typeof user.WORK_STREET === 'string' && (
        <div className={styles.item}>
          <Label>Адрес</Label>
          <Input
            name='address'
            placeholder='Адрес'
            register={register}
            error={errors.address?.message || null}
            onChange={onChangeHandler}
          />
        </div>
      )}
      {typeof user.NAME === 'string' && (
        <div className={styles.item}>
          <Label>ФИО</Label>
          <Readonly name='email' value={user.NAME} />
        </div>
      )}
      {serverError && <Error error={serverError} />}

      {isAllowEdit && user.ACTIVE === 'N' && (
        <>
          <p>
            Пользователь еще не активирован!{' '}
            <span className={styles.action} onClick={onActiveUser}>
              Активировать
            </span>
          </p>
        </>
      )}

      <Button
        text='Сохранить'
        type='submit'
        isDisabled={Object.keys(errors).length !== 0}
      />
    </form>
  );
}
