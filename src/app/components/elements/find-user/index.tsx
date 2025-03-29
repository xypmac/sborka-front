'use client';

import { useState, useEffect } from 'react';

import Label from '@/app/components/elements/label';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import { FindUserProps } from './types';
import styles from './styles.module.scss';

export default function FindUser({
  user,
  onSet,
  onShowModal,
  initialValue,
  label,
}: FindUserProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(value);
  }, [initialValue]);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      onSet(value);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [value, 500]);

  return (
    <div className={styles.item}>
      <Label>{label}</Label>
      <div className={styles.control}>
        <input
          className={styles.input}
          placeholder='Введите ID'
          id='id'
          name='id'
          onChange={(e) => setValue(e.target.value.replace(/\D/, ''))}
          type='text'
          value={value}
        />
        {user && (
          <p className={styles.action} onClick={() => onShowModal(user.ID)}>
            <FaArrowAltCircleRight />
            {user.LOGIN}
          </p>
        )}
      </div>
    </div>
  );
}
