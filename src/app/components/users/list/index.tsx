import UserLine from '@/app/components/elements/user-line';
import Empty from '@/app/components/elements/empty';
import { User } from '@/app/store/users/types';

import { ListProps } from './types';
import styles from './styles.module.scss';

export default function List({ isAdmin, users }: ListProps) {
  return users.length === 0 ? (
    <Empty>Ничего нет</Empty>
  ) : (
    <div>
      <div className={styles.header}>
        <p>Название контрагента</p>
        <p>ФИО</p>
        <p>Телефон</p>
        <p>E-mail</p>
        <p>Адрес</p>
        <p>Активен</p>
      </div>
      {users.map((user: User) => {
        return (
          <UserLine
            isAdmin={isAdmin}
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
  );
}
