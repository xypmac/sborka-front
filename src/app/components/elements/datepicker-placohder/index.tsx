'use client';

import { ReactElement } from 'react';

import { DatepickerPlaceholderProps } from './types';
import styles from './styles.module.scss';

export default function DatepickerPlaceholder({
  onClick,
  value,
}: DatepickerPlaceholderProps): ReactElement {
  return (
    <button className={styles.datepicker} onClick={onClick}>
      {value || 'Выбрать дату'}
    </button>
  );
}
