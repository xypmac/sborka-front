'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import Error from '@/app/components/elements/error';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import Readonly from '@/app/components/elements/readonly';
import getUserGroupText from '@/app/utils/get-user-group-text';
import { AppDispatch } from '@/app/store';
import { clearError } from '@/app/store/users';
import getPhoneFormat from '@/app/utils/get-phone-number';
import { update } from '@/app/store/session/thunks';
import { activeUserById } from '@/app/store/users/thunks';

import schema from './schema';
import { ProfileProps, Fields } from './types';
import styles from './styles.module.scss';

export default function User({
  user,
  serverError = null,
  isWait = false,
  isJustWatchMode = false,
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
    dispatch(update({ ...data, id: user.ID }));
  };

  const onActiveUserHandler = () => {
    dispatch(activeUserById(user.ID));
  };

  return (
    <form
      className={cn(styles.content, isWait && styles.wait)}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <input {...register('type')} hidden />

      <div className={styles.header}>
        <p className={styles.type}>{getUserGroupText(user.GROUP_ID)}</p>
        <p className={styles.id}>ID: {user.ID}</p>
      </div>

      <div className={styles.item}>
        <p className={styles.label}>Логин</p>
        <Readonly name='LOGIN' value={user.LOGIN} />
      </div>

      <div className={styles.item}>
        <p className={styles.label}>Почта</p>
        <Readonly name='EMAIL' value={user.EMAIL} />
      </div>

      <div className={styles.item}>
        <p className={styles.label}>Телефон</p>
        <Input
          name='phone'
          isDisable={isJustWatchMode}
          placeholder='Номер телефона'
          register={register}
          error={errors.phone?.message || null}
          onChange={onChangeHandler}
        />
      </div>

      {typeof user.WORK_COMPANY === 'string' && (
        <div className={styles.item}>
          <p className={styles.label}>Название контрагента</p>
          <Readonly name='WORK_COMPANY' value={user.WORK_COMPANY} />
        </div>
      )}

      {typeof user.WORK_STREET === 'string' && (
        <div className={styles.item}>
          <p className={styles.label}>Адрес</p>
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
          <p className={styles.label}>ФИО</p>
          <Readonly name='email' value={user.NAME} />
        </div>
      )}
      {serverError && <Error error={serverError} />}

      {!isJustWatchMode ? (
        user.ACTIVE === 'N' && (
          <>
            <span className={styles.active}>
              Пользователь еще не активирован
            </span>
            <Button
              text='Активировать'
              type='button'
              onClick={onActiveUserHandler}
            />
          </>
        )
      ) : (
        <Button
          text='Сохранить'
          type='submit'
          isDisabled={Object.keys(errors).length !== 0}
        />
      )}
    </form>
  );
}
