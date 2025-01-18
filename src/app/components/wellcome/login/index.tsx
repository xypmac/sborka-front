'use client';

import { useState } from 'react';
import cn from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/app/components/button';
import { login } from '@/app/store/session';
import { AppDispatch, RootState } from '@/app/store';

import schema from './schema';
import { Fields } from './types';

import styles from '../styles.module.scss';

export default function Login() {
  const { serverError, wait } = useSelector((state: RootState) => ({
    serverError: state.session.error,
    wait: state.session.wait,
  }));

  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Fields>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Fields> = (data) => {
    dispatch(login({ ...data }));
    reset();
  };

  return (
    <>
      <p className={styles.heading}>С возвращением!</p>
      <p className={styles.subheading}>Укажите ваш логин и пароль</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

        {serverError && <p className={styles.error}>{serverError}</p>}

        <Button
          text='Войти'
          type='submit'
          isDisabled={Object.keys(errors).length !== 0}
        />
      </form>
    </>
  );
}
