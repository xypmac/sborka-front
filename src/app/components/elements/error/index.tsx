'use client';

import { ReactElement } from 'react';

import styles from './styles.module.scss';

export default function Error({ error }: { error: string }): ReactElement {
  return <p className={styles.error}>{error}</p>;
}
