'use client';

import { useState } from 'react';
import cn from 'classnames';
import { FaRegUserCircle } from 'react-icons/fa';

import UserInformation from '@/app/containers/elements/user-information';

import { UserLineProps } from './types';
import styles from './styles.module.scss';

export default function UserLine({
  email,
  phone,
  company,
  street,
  name,
  id,
  active,
}: UserLineProps) {
  const [isShowInfo, setIsShowInfo] = useState(false);

  return (
    <div className={styles.elem} key={id}>
      {isShowInfo && (
        <UserInformation id={id} onHide={() => setIsShowInfo(false)} />
      )}
      <p className={styles.action} onClick={() => setIsShowInfo(true)}>
        {company}
      </p>
      <p>{name}</p>
      <p className={styles.phone}>{phone || '-'}</p>
      <p className={styles.email}>{email}</p>
      <p>{street}</p>
      <p className={cn(styles.status, active === 'Y' ? styles.yes : styles.no)}>
        {active === 'Y' ? 'Да' : 'Нет'}
      </p>
    </div>
  );
}
