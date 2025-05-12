'use client';

import Empty from '@/app/components/elements/empty';

import Item from './children/item';
import { ListProps } from './types';
import styles from './styles.module.scss';

export default function List({ users }: ListProps) {
  return users.length === 0 ? (
    <Empty text='Ничего нет' />
  ) : (
    <div className={styles.list}>
      {users.map((user: { ID: number; NAME: string }) => {
        return <Item key={user.ID} name={user.NAME} id={user.ID} />;
      })}
    </div>
  );
}
