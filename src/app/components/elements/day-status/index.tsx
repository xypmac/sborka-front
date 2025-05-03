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
      <Flex align='center' direction='row' gap={12} justify='flex-start'>
        <Button text='Свободный' type='submit' onClick={() => onSave('10')} />
        <Button text='Выходной' type='submit' onClick={() => onSave('11')} />
        <p onClick={onHide} className={styles.cancel}>
          Отмена
        </p>
      </Flex>
    </div>
  );
}
