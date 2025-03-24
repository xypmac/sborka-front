'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import Error from '@/app/components/elements/error';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import { AppDispatch } from '@/app/store';
import { login } from '@/app/store/session/thunks';
import { clearError } from '@/app/store/session';
import { EXPIRED_TOKEN_ERROR } from '@/app/utils/constants';

import schema from './schema';
import { LoginProps, Fields } from './types';
import styles from './styles.module.scss';

export default function Login({ serverError }: LoginProps) {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Fields>({
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

  const onChangeHandler = (value: string, field: 'login' | 'password') => {
    setValue(field, value, {
      shouldValidate: true,
    });
  };

  const onSubmitHandler: SubmitHandler<Fields> = (data) => {
    dispatch(login({ ...data }));
  };

  return (
    <>
      <p className={styles.heading}>С возвращением!</p>
      <p className={styles.subheading}>Укажите ваш логин и пароль</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <Input
          name='login'
          placeholder='Логин'
          register={register}
          error={errors.login?.message || null}
          onChange={onChangeHandler}
        />
        <Input
          name='password'
          type='password'
          placeholder='Пароль'
          register={register}
          error={errors.password?.message || null}
          onChange={onChangeHandler}
        />
        {serverError && (
          <Error
            error={
              serverError === 'Expired token'
                ? EXPIRED_TOKEN_ERROR
                : serverError
            }
          />
        )}
        <Button
          text='Войти'
          type='submit'
          isDisabled={Object.keys(errors).length !== 0}
        />
      </form>
    </>
  );
}
