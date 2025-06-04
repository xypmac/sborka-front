import { ReactElement } from 'react';

import { ErrorProps } from './types';
import styles from './styles.module.scss';

export default function Error({ children }: ErrorProps): ReactElement {
  return <p className={styles.error}>{children}</p>;
}
