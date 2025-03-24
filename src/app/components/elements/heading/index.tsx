'use client';

import { ReactElement } from 'react';

import styles from './styles.module.scss';

export default function Heading({ children }: { children: ReactElement }) {
  return <div className={styles.heading}>{children}</div>;
}
