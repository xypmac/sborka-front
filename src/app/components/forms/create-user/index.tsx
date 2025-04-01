'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';

import Error from '@/app/components/elements/error';
import Select from '@/app/components/elements/select';
import Flex from '@/app/components/elements/flex';
import Label from '@/app/components/elements/label';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import getPhoneFormat from '@/app/utils/get-phone-number';
import { USERS_GROUP } from '@/app/utils/constants';

import schema from './schema';
import { CreateUserProps, Fields, FieldsNames } from './types';
import styles from './styles.module.scss';

export default function CreateUser({
  onCreateUser,
  isWait,
  error,
}: CreateUserProps) {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Fields>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    onCreateUser({ ...data });
  };

  const onChangeHandler = (value: string, field: FieldsNames) => {
    setValue(field, field === 'phone' ? getPhoneFormat(value) : value, {
      shouldValidate: true,
    });
  };

  return (
    <form
      className={cn(styles.form, isWait && styles.wait)}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <p className={styles.caption}>Создать пользователя</p>
      <Flex gap={20} margin='20px 0' direction='column'>
        <Flex gap={4} direction='column'>
          <Label>Тип пользователя</Label>
          <Select
            defaultOption='Тип пользователя'
            options={USERS_GROUP}
            onSelect={onChangeHandler}
            error={errors.type?.message || null}
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Логин</Label>
          <Input
            name='login'
            placeholder='Логин'
            register={register}
            error={errors.login?.message || null}
            onChange={onChangeHandler}
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Пароль</Label>
          <Input
            name='password'
            placeholder='Пароль'
            register={register}
            error={errors.password?.message || null}
            onChange={onChangeHandler}
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Повторите пароль</Label>
          <Input
            name='passwordConfirm'
            placeholder='Повторите пароль'
            register={register}
            error={errors.passwordConfirm?.message || null}
            onChange={onChangeHandler}
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Почта</Label>
          <Input
            name='email'
            placeholder='Почта'
            register={register}
            error={errors.email?.message || null}
            onChange={onChangeHandler}
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Номер телефона</Label>
          <Input
            name='phone'
            placeholder='Номер телефона'
            register={register}
            error={errors.phone?.message || null}
            onChange={onChangeHandler}
          />
        </Flex>

        {(getValues().type === '6' ||
          getValues().type === '7' ||
          getValues().type === '9') && (
          <Flex gap={4} direction='column'>
            <Label>ФИО</Label>
            <Input
              name='fio'
              placeholder='ФИО'
              register={register}
              error={errors.fio?.message || null}
              onChange={onChangeHandler}
            />
          </Flex>
        )}

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
      </Flex>

      <Flex direction='column' gap={10}>
        <Button
          text='Создать'
          type='submit'
          isDisabled={Object.keys(errors).length !== 0}
        />
        {error && <Error error={error} />}
      </Flex>
    </form>
  );
}
