'use client';

import { User } from '@/app/store/users/type';
import Loader from '@/app/components/elements/loader';
import Empty from '@/app/components/elements/empty';
import Filter from '@/app/components/elements/users-filter';
import Button from '@/app/components/elements/button';
import UserLine from '@/app/components/elements/user-line';

import { UsersProps } from './types';
import styles from './styles.module.scss';

export default function Users({ users, isWait, total, loadMore }: UsersProps) {
  return (
    <div className={styles.list}>
      {isWait && <Loader borderRadius={5} />}
      <Filter />
      {users.length === 0 ? (
        <Empty text='Ничего нет' mt={32} />
      ) : (
        <>
          <div className={styles.header}>
            <p>Название контрагента</p>
            <p>ФИО</p>
            <p className={styles.phone}>Телефон</p>
            <p className={styles.email}>E-mail</p>
            <p>Адрес</p>
            <p className={styles.status}>Активен</p>
          </div>
          <div className={styles.list}>
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
          {users.length < total && (
            <Button text='Показать еще' type='button' onClick={loadMore} />
          )}
        </>
      )}
    </div>
  );
}
