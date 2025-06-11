'use client';

import { useState } from 'react';
import cn from 'classnames';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import Label from '@/app/components/elements/label';
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
  isAdmin,
  active,
}: UserLineProps) {
  const [isShowInfo, setIsShowInfo] = useState(false);

  return (
    <div className={styles.elem} key={id}>
      {isShowInfo && (
        <UserInformation
          isAdmin={isAdmin}
          id={id}
          onHide={() => setIsShowInfo(false)}
        />
      )}
      <div
        className={cn(styles.action, styles.item)}
        onClick={() => setIsShowInfo(true)}
      >
        <div className={styles.mobileTitle}>
          <Label>Название контрагента: </Label>
        </div>
        <div className={styles.name}>
          <FaArrowAltCircleRight />
          {company}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.mobileTitle}>
          <Label>ФИО: </Label>
        </div>
        {name}
      </div>
      <div className={styles.item}>
        <div className={styles.mobileTitle}>
          <Label>Телефон: </Label>
        </div>
        {phone || '-'}
      </div>
      <div className={styles.item}>
        <div className={styles.mobileTitle}>
          <Label>E-mail: </Label>
        </div>
        {email}
      </div>
      <div className={styles.item}>
        <div className={styles.mobileTitle}>
          <Label>Адрес: </Label>
        </div>
        {street}
      </div>
      <div className={cn(styles.item, active === 'Y' ? styles.yes : styles.no)}>
        <div className={styles.mobileTitle}>
          <Label>Активен: </Label>
        </div>
        {active === 'Y' ? 'Да' : 'Нет'}
      </div>
    </div>
  );
}
