'use client';

import Empty from '@/app/components/elements/empty';
import { CalendarUser } from '@/app/store/calendar/type';

import Item from './children/item';
import { ListProps } from './types';
import styles from './styles.module.scss';

export default function List({ users }: ListProps) {
  return users.length === 0 ? (
    <Empty text='Ничего нет' />
  ) : (
    <div className={styles.list}>
      {users.map((user: CalendarUser) => {
        return (
          <Item key={user.id} name={user.name} id={user.id} day={user.day} />
        );
      })}
    </div>
  );
}
