'use client';

import { LabelProps } from './types';
import styles from './styles.module.scss';

export default function Label({ children, mb = '0' }: LabelProps) {
  return (
    <p className={styles.label} style={{ marginBottom: `${mb}px` }}>
      {children}
    </p>
  );
}
