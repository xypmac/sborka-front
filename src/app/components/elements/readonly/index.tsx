'use client';

import cn from 'classnames';

import { ReadonlyProps } from './types';
import styles from './styles.module.scss';

export default function Readonly({ name, value }: ReadonlyProps) {
  return (
    <div className={styles.elem}>
      <input
        className={styles.input}
        name={name}
        id={name}
        type='text'
        readOnly
        value={value}
      />
    </div>
  );
}
