import { ReactNode } from 'react';

import Menu from '@/app/components/menu';

import styles from './styles.module.scss';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Menu />
        {children}
      </div>
    </div>
  );
}
