'use client';

import { User } from '@/app/store/users/type';
import Empty from '@/app/components/elements/empty';

import UserLine from '@/app/components/elements/user-line';

import { ListProps } from './types';
import styles from './styles.module.scss';

export default function List({ users }: ListProps) {
  return users.length === 0 ? (
    <Empty text='Ничего нет' />
  ) : (
    <div className={styles.list}>
      <div className={styles.header}>
        <p>Название контрагента</p>
        <p>ФИО</p>
        <p className={styles.phone}>Телефон</p>
        <p className={styles.email}>E-mail</p>
        <p>Адрес</p>
        <p className={styles.status}>Активен</p>
      </div>
      <div className={styles.elems}>
        {users.map((user: User) => {
          return (
            <UserLine
              key={user.ID}
              id={user.ID}
              company={user.WORK_COMPANY || '-'}
              street={user.WORK_STREET || '-'}
              name={user.NAME || '-'}
              active={user.ACTIVE}
              phone={user.PHONE_NUMBER || '-'}
              email={user.EMAIL}
            />
          );
        })}
      </div>
    </div>
  );
}
