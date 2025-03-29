'use client';

import cn from 'classnames';

import { OrderTabsProps } from './types';
import styles from './styles.module.scss';

export default function OrderTabs({ onSetTab, active }: OrderTabsProps) {
  return (
    <div className={styles.tabs}>
      <div
        className={cn(styles.tab, active === 1 && styles.active)}
        onClick={() => onSetTab(1)}
      >
        Общая информация
      </div>
      <div
        className={cn(styles.tab, active === 2 && styles.active)}
        onClick={() => onSetTab(2)}
      >
        Комментарии
      </div>
      <div
        className={cn(styles.tab, active === 3 && styles.active)}
        onClick={() => onSetTab(3)}
      >
        Файлы
      </div>
    </div>
  );
}
