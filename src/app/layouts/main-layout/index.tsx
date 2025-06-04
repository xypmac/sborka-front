import Menu from '@/app/containers/elements/menu';

import { MainLayoutProps } from './types';
import styles from './styles.module.scss';

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.block}>
        <Menu />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
