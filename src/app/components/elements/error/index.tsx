'use client';

import { ReactElement } from 'react';

import { ErrorProps } from './types';
import styles from './styles.module.scss';

export default function Error({ error }: ErrorProps): ReactElement {
  return <p className={styles.error}>{error}</p>;
}
