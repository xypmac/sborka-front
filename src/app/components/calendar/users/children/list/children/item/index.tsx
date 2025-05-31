'use client';

import { useState } from 'react';

import Flex from '@/app/components/elements/flex';
import UserInformation from '@/app/containers/elements/user-information';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import getDayStatusText from '@/app/utils/get-day-status-text';
import getUserGroupText from '@/app/utils/get-user-group-text';

import { ItemProps } from './types';
import styles from './styles.module.scss';

export default function Item({ name, id, group, day, isAdmin }: ItemProps) {
  const [isShowInfo, setIsShowInfo] = useState(false);

  return (
    <>
      {isShowInfo && (
        <UserInformation
          isAdmin={isAdmin}
          id={String(id)}
          onHide={() => setIsShowInfo(false)}
        />
      )}
      <div className={styles.elem}>
        <Flex align='center' justify='flex-start' gap={8}>
          <div className={styles.name} onClick={() => setIsShowInfo(true)}>
            <FaArrowAltCircleRight />
            {name}
          </div>
          <p className={styles.type}>{getUserGroupText(group)}</p>
        </Flex>
        <div>На выбранную дату: {getDayStatusText(day) || 'Нет статуса'} </div>
      </div>
    </>
  );
}
