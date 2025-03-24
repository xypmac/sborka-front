'use client';

import cn from 'classnames';
import Link from 'next/link';

import { User } from '@/app/store/users/type';
import Loader from '@/app/components/elements/loader';
import Empty from '@/app/components/elements/empty';
import Filter from '@/app/components/elements/users-filter';
import Button from '@/app/components/elements/button';

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
            <p className={styles.email}>E-mail</p>
            <p className={styles.phone}>Телефон</p>
            <p className={styles.status}>Активен</p>
            <p>Название контрагента</p>
            <p>Адрес</p>
            <p>ФИО</p>
            <p />
          </div>
          <div className={styles.list}>
            {users.map((user: User) => {
              return (
                <div className={styles.elem} key={user.ID}>
                  <p className={styles.email}>{user.EMAIL}</p>
                  <p className={styles.phone}>{user.PHONE_NUMBER || '-'}</p>
                  <p
                    className={cn(
                      styles.status,
                      user.ACTIVE === 'Y' ? styles.yes : styles.no
                    )}
                  >
                    {user.ACTIVE === 'Y' ? 'Да' : 'Нет'}
                  </p>
                  <p>{user.WORK_COMPANY || '-'}</p>
                  <p>{user.WORK_STREET || '-'}</p>
                  <p>{user.NAME || '-'}</p>
                  <p>
                    <Link href={`/user/${user.ID}`} target='_blank'>
                      Cмотреть профиль
                    </Link>
                  </p>
                </div>
              );
            })}
          </div>
          {users.length < total && (
            <Button
              text='Показать еще'
              type='button'
              onClick={() => loadMore()}
            />
          )}
        </>
      )}
    </div>
  );
}
