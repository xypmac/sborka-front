'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import Input from '@/app/components/elements/input';
import Button from '@/app/components/elements/button';
import Select from '@/app/components/elements/select';
import { registration } from '@/app/store/session/thunks';
import { clearError } from '@/app/store/session';
import { AppDispatch } from '@/app/store';
import getPhoneFormat from '@/app/utils/get-phone-number';
import { USERS_GROUP } from '@/app/utils/constants';

import schema from './schema';
import { RegistrationProps, Fields, FildsNames } from './types';
import styles from './styles.module.scss';

export default function Registration({ serverError }: RegistrationProps) {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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

  const onChangeHandler = (value: string, field: FildsNames) => {
    setValue(field, field === 'phone' ? getPhoneFormat(value) : value, {
      shouldValidate: true,
    });
  };

  const onSubmitHandler: SubmitHandler<Fields> = (data) => {
    dispatch(registration({ ...data, type: [data.type] }));
  };

  return (
    <>
      <p className={styles.heading}>Добро пожаловать!</p>
      <p className={styles.subheading}>Создайте аккаунт</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <Select
          defaultOption='Тип пользователя'
          options={USERS_GROUP}
          onSelect={onChangeHandler}
          error={errors.type?.message || null}
        />
        <Input
          name='login'
          placeholder='Логин'
          register={register}
          error={errors.login?.message || null}
          onChange={onChangeHandler}
        />
        <Input
          name='password'
          placeholder='Пароль'
          register={register}
          error={errors.password?.message || null}
          onChange={onChangeHandler}
        />
        <Input
          name='passwordConfirm'
          placeholder='Повторите пароль'
          register={register}
          error={errors.passwordConfirm?.message || null}
          onChange={onChangeHandler}
        />
        <Input
          name='phone'
          placeholder='Номер телефона'
          register={register}
          error={errors.phone?.message || null}
          onChange={onChangeHandler}
        />
        <Input
          name='email'
          placeholder='Почта'
          register={register}
          error={errors.email?.message || null}
          onChange={onChangeHandler}
        />
        {getValues().type === '8' && (
          <Input
            name='partner'
            placeholder='Название контрагента'
            register={register}
            error={errors.partner?.message || null}
            onChange={onChangeHandler}
          />
        )}
        {getValues().type === '8' && (
          <Input
            name='address'
            placeholder='Адрес'
            register={register}
            error={errors.address?.message || null}
            onChange={onChangeHandler}
          />
        )}
        {(getValues().type === '6' ||
          getValues().type === '7' ||
          getValues().type === '9') && (
          <Input
            name='fio'
            placeholder='ФИО'
            register={register}
            error={errors.fio?.message || null}
            onChange={onChangeHandler}
          />
        )}
        {serverError && (
          <p
            className={styles.error}
            dangerouslySetInnerHTML={{ __html: serverError }}
          />
        )}
        <Button
          text='Зарегистрироваться'
          type='submit'
          isDisabled={Object.keys(errors).length !== 0}
        />
      </form>
    </>
  );
}
