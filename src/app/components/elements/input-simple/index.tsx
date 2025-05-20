'use client';

import { InputSimpleProps } from './types';
import styles from './styles.module.scss';

export default function InputSimple({
  id,
  placeholder,
  value,
  onChange,
}: InputSimpleProps) {
  return (
    <input
      id={id}
      name={id}
      className={styles.input}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
