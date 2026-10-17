'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import Label from '@/app/components/elements/label';
import Flex from '@/app/components/elements/flex';
import Error from '@/app/components/elements/error';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import Readonly from '@/app/components/elements/readonly';
import Calendar from '@/app/containers/elements/calendar';
import getUserGroupText from '@/app/utils/get-user-group-text';
import { AppDispatch } from '@/app/store';
import { clearError } from '@/app/store/users';
import { update } from '@/app/store/session/thunks';
import getPhoneFormat from '@/app/utils/get-phone-number';

import schema from './schema';
import { ProfileProps, Fields } from './types';
import styles from './styles.module.scss';

export default function User({
  user,
  serverError = null,
  isAdmin,
  isWide = false,
  isWait = false,
  isAllowEdit = false,
  onActiveUser,
  onUpdateUser,
}: ProfileProps) {
  const [tab, setTab] = useState('form');

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
      type: typeof user.GROUP_ID !== 'string' ? String(Object.keys(user.GROUP_ID)[0]) : user.GROUP_ID,
    },
    resolver: yupResolver(schema),
  });

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
    else dispatch(update({ ...data }));
  };

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.type}>{getUserGroupText(user.GROUP_ID)}</p>
        <p className={styles.id}>ID: {user.ID}</p>
      </div>
      {isAdmin &&
        (getUserGroupText(user.GROUP_ID) === 'Сборщик' ||
          getUserGroupText(user.GROUP_ID) === 'Замерщик') && (
          <div className={styles.tabs}>
            <div
              className={cn(styles.tab, tab === 'form' && styles.active)}
              onClick={() => setTab('form')}
            >
              Общая информация
            </div>
            <div
              className={cn(styles.tab, tab === 'calendar' && styles.active)}
              onClick={() => setTab('calendar')}
            >
              Календарь рабочих дней
            </div>
          </div>
        )}
      {tab === 'form' ? (
        <form
          className={cn(
            styles.content,
            isWait && styles.wait,
            isWide && styles.wide
          )}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <input {...register('type')} hidden />

          <Flex direction='column' gap={4}>
            <Label>Логин</Label>
            <Readonly name='LOGIN' value={user.LOGIN} />
          </Flex>
          <Flex direction='column' gap={4}>
            <Label>Почта</Label>
            <Readonly name='EMAIL' value={user.EMAIL} />
          </Flex>
          <Flex direction='column' gap={4}>
            <Label>Телефон</Label>
            <Input
              name='phone'
              placeholder='Номер телефона'
              register={register}
              error={errors.phone?.message || null}
              onChange={onChangeHandler}
            />
          </Flex>
          {typeof user.WORK_COMPANY === 'string' && (
            <Flex direction='column' gap={4}>
              <Label>Название контрагента</Label>
              <Readonly name='WORK_COMPANY' value={user.WORK_COMPANY} />
            </Flex>
          )}
          {typeof user.WORK_STREET === 'string' && (
            <Flex direction='column' gap={4}>
              <Label>Адрес</Label>
              <Input
                name='address'
                placeholder='Адрес'
                register={register}
                error={errors.address?.message || null}
                onChange={onChangeHandler}
              />
            </Flex>
          )}
          {typeof user.NAME === 'string' && (
            <Flex direction='column' gap={4}>
              <Label>ФИО</Label>
              <Readonly name='email' value={user.NAME} />
            </Flex>
          )}

          {serverError && <Error>{serverError}</Error>}
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

          <Button type='submit' isDisabled={Object.keys(errors).length !== 0}>
            Сохранить
          </Button>
        </form>
      ) : (
        <Calendar userId={user.ID} />
      )}
    </div>
  );
}
