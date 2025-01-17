'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import Input from '@/app/containers/input';
import Button from '@/app/containers/button';
import { login } from '@/app/store/session';
import { AppDispatch } from '@/app/store';

import schema from './schema';
import styles from './styles.module.scss';

type Inputs = {
  email: string;
  password: string;
};

export default function WellcomeForm({
  isLoginMode,
}: {
  isLoginMode: boolean;
}) {
  const dispatch: AppDispatch = useDispatch();

  const {
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (isLoginMode) {
      dispatch(login({ ...data }));
    } else {
      console.log(2);
    }
  };

  const buttonText = isLoginMode ? 'Войти' : 'Зарегистрироваться';

  const onChangeHandler = (value: string, field: string) => {
    setValue(field as 'email' | 'password', value);
  };

  const onFocusHandler = (field: string) => {
    clearErrors(field as 'email' | 'password');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        name='email'
        error={errors.email?.message || ''}
        id='email'
        type='text'
        placeholder='Почта'
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
      />

      <Input
        name='password'
        error={errors.password?.message || ''}
        id='password'
        type='text'
        placeholder='Пароль'
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
      />

      <Button text={buttonText} type='submit' />
    </form>
  );
}
