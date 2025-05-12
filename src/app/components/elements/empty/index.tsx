'use client';

import { ReactElement } from 'react';

import { EmptyProps } from './types';
import styles from './styles.module.scss';

export default function Empty({ text }: EmptyProps): ReactElement {
  return <p className={styles.text}>{text}</p>;
}
