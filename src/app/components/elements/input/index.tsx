'use client';

import cn from 'classnames';

import Error from '@/app/components/elements/error';

import { InputProps } from './types';
import styles from './styles.module.scss';

export default function Input({
  register,
  name,
  placeholder,
  error,
  onChange,
  type = 'text',
  isDisable = false,
}: InputProps) {
  return (
    <div className={styles.elem}>
      <input
        {...register(name)}
        className={cn(styles.input, error && styles.error)}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value, name)}
        disabled={isDisable}
      />
      {error && <Error error={error} />}
    </div>
  );
}
