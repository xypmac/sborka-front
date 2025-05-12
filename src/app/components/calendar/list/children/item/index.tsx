'use client';

import { useState } from 'react';

import UserInformation from '@/app/containers/elements/user-information';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import { ItemProps } from './types';
import styles from './styles.module.scss';

export default function Item({ name, id }: ItemProps) {
  const [isShowInfo, setIsShowInfo] = useState(false);

  return (
    <>
      {isShowInfo && (
        <UserInformation id={String(id)} onHide={() => setIsShowInfo(false)} />
      )}
      <div className={styles.name} onClick={() => setIsShowInfo(true)}>
        <FaArrowAltCircleRight />
        {name}
      </div>
    </>
  );
}
