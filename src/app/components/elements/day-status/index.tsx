'use client';

import { ReactElement, useState } from 'react';
import { format } from 'date-fns';

import Button from '@/app/components/elements/button';
import Flex from '@/app/components/elements/flex';

import { DayStatusProps } from './types';
import styles from './styles.module.scss';

export default function DayStatus({
  date,
  onHide,
  onSave,
}: DayStatusProps): ReactElement {
  return (
    <div className={styles.days}>
      <p>
        Выбрать статус дня{' '}
        <span className={styles.date}>
          {date ? format(new Date(date), 'dd.MM.yyyy') : ''}
        </span>
      </p>
      <div className={styles.controls}>
        <Button type='submit' onClick={() => onSave('10')}>
          Свободный
        </Button>
        <Button type='submit' onClick={() => onSave('11')}>
          Выходной
        </Button>
        <p onClick={onHide} className={styles.cancel}>
          Отмена
        </p>
      </div>
    </div>
  );
}
