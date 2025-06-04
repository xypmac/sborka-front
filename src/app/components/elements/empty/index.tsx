'use client';

import { ReactElement } from 'react';

import { EmptyProps } from './types';
import styles from './styles.module.scss';

export default function Empty({ children }: EmptyProps): ReactElement {
  return <p className={styles.text}>{children}</p>;
}
