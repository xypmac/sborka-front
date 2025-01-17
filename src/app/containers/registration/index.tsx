'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import Input from '@/app/containers/input';

import styles from './styles.module.scss';

type Inputs = {
  email: string;
  password: string;
};

export default function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input name="emaiil"} />

      <Input defaultValue='test' {...register('password')} />

      {errors.email && <span>This field is required</span>}

      <input type='submit' />
    </form>
  );
}
