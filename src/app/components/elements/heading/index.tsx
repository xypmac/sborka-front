'use client';

import { ReactElement } from 'react';

import styles from './styles.module.scss';

export default function Heading({ children }: { children: JSX.Element }) {
  return <div className={styles.heading}>{children}</div>;
}
