'use client';

import { ReactElement } from 'react';

import { EmptyProps } from './types';
import styles from './styles.module.scss';

export default function Empty({ text, mt = 0 }: EmptyProps): ReactElement {
  return (
    <p className={styles.text} style={{ marginTop: `${mt}px` }}>
      {text}
    </p>
  );
}
