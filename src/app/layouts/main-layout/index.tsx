import { ReactNode } from 'react';

import Menu from '@/app/containers/elements/menu';

import styles from './styles.module.scss';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <div className={styles.block}>
        <Menu />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
