'use client';

import { ReactElement } from 'react';

import styles from './styles.module.scss';

export default function label({
  children,
}: {
  children: ReactElement | string;
}) {
  return <p className={styles.label}>{children}</p>;
}
