'use client';

import { useState, ChangeEvent } from 'react';
import cn from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/app/components/button';
import Select from '@/app/components/select';
import { registration } from '@/app/store/session';
import { AppDispatch, RootState } from '@/app/store';

import schema from './schema';
import { Fields } from './types';

import styles from '../styles.module.scss';

export default function Login() {
  const { serverError, wait } = useSelector((state: RootState) => ({
    serverError: state.session.error,
    wait: state.session.wait,
  }));

  const [userType, setUserType] = useState(1);

  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({
    resolver: yupResolver(schema),
  });

  const onSelectUserTypeHandler = (type: number) => {
    setUserType(type);
  };

  const onSubmitHandler: SubmitHandler<Fields> = (data) => {
    dispatch(registration({ ...data }));
    reset();
  };

  return (
    <>
      <p className={styles.heading}>Добро пожаловать!</p>
      <p className={styles.subheading}>Создайте аккаунт</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={styles.elem}>
          <Select onSelect={onSelectUserTypeHandler} />
        </div>

        <div className={styles.elem}>
          <input
            {...register('login')}
            className={cn(
              styles.input,
              errors.login?.message && styles.inputError
            )}
            name='login'
            id='login'
            type='text'
            placeholder='Логин'
          />

          {errors.login?.message && (
            <p className={styles.error}>{errors.login.message}</p>
          )}
        </div>

        <div className={styles.elem}>
          <input
            {...register('password')}
            className={cn(
              styles.input,
              errors.password?.message && styles.inputError
            )}
            name='password'
            id='password'
            type='text'
            placeholder='Пароль'
          />

          {errors.password?.message && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.elem}>
          <input
            {...register('phone')}
            className={cn(
              styles.input,
              errors.phone?.message && styles.inputError
            )}
            name='phone'
            id='phone'
            type='text'
            placeholder='Номер телефона'
          />

          {errors.phone?.message && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>

        <div className={styles.elem}>
          <input
            {...register('email')}
            className={cn(
              styles.input,
              errors.email?.message && styles.inputError
            )}
            name='email'
            id='email'
            type='text'
            placeholder='Почта'
          />

          {errors.email?.message && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        {userType === 5 && (
          <div className={styles.elem}>
            <input
              {...register('kontragent')}
              className={cn(
                styles.input,
                errors.kontragent?.message && styles.inputError
              )}
              name='kontragent'
              id='kontragent'
              type='text'
              placeholder='Название контрагента'
            />

            {errors.kontragent?.message && (
              <p className={styles.error}>{errors.kontragent.message}</p>
            )}
          </div>
        )}

        {userType === 5 && (
          <div className={styles.elem}>
            <input
              {...register('address')}
              className={cn(
                styles.input,
                errors.address?.message && styles.inputError
              )}
              name='address'
              id='address'
              type='text'
              placeholder='Адрес'
            />

            {errors.address?.message && (
              <p className={styles.error}>{errors.address.message}</p>
            )}
          </div>
        )}

        {(userType === 2 || userType === 3 || userType === 4) && (
          <div className={styles.elem}>
            <input
              {...register('fio')}
              className={cn(
                styles.input,
                errors.fio?.message && styles.inputError
              )}
              name='fio'
              id='fio'
              type='text'
              placeholder='ФИО'
            />

            {errors.fio?.message && (
              <p className={styles.error}>{errors.fio.message}</p>
            )}
          </div>
        )}

        {serverError && <p className={styles.error}>{serverError}</p>}

        <Button
          text='Зарегистрироваться'
          type='submit'
          isDisabled={Object.keys(errors).length !== 0}
        />
      </form>
    </>
  );
}
