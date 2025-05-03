'use client';

import { LabelProps } from './types';
import styles from './styles.module.scss';

export default function label({ children }: LabelProps) {
  return <p className={styles.label}>{children}</p>;
}
