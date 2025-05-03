'use client';

import { FaRegTimesCircle } from 'react-icons/fa';

import User from '@/app/components/forms/user';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import { User as UserType } from '@/app/store/users/type';

import { UserComponentProps } from './types';
import styles from './styles.module.scss';

export default function UserInformation({
  isLoading,
  isWaitUpdating,
  error,
  user,
  onHide,
  onActiveUser,
  onUpdateUser,
}: UserComponentProps) {
  return (
    <div className={styles.information}>
      <div className={styles.bg} onClick={onHide} />
      <div className={styles.content}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
            <div className={styles.icon} onClick={onHide}>
              <FaRegTimesCircle size={20} />
            </div>
            <User
              serverError={error}
              isWait={isWaitUpdating}
              isWide
              isShowCalendar={false}
              user={user as UserType}
              isAllowEdit
              onActiveUser={onActiveUser}
              onUpdateUser={onUpdateUser}
            />
          </>
        )}
      </div>
    </div>
  );
}
