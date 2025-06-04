'use client';

import Flex from '@/app/components/elements/flex';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';

import { Filter, List } from './children';
import { UserProps } from './types';
import styles from './styles.module.scss';

export default function Users({
  isWait,
  isAdmin,
  currentPage,
  error,
  onSearch,
  users,
}: UserProps) {
  return isWait && currentPage === 0 ? (
    <Loader />
  ) : error ? (
    <Error>{error}</Error>
  ) : (
    <div className={styles.users}>
      {isWait && <Loader />}
      <p className={styles.caption}>Список пользователей</p>
      <Flex direction='column' gap={32}>
        <Filter onSearch={onSearch} />
        <List isAdmin={isAdmin} users={users} />
      </Flex>
    </div>
  );
}
