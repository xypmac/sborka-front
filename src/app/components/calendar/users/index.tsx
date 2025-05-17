'use client';

import Flex from '@/app/components/elements/flex';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';

import { Filter, List } from './children';
import { UserProps } from './types';
import styles from './styles.module.scss';

export default function Users({
  isWait,
  currentPage,
  error,
  onSearch,
  users,
}: UserProps) {
  return isWait && currentPage === 0 ? (
    <Loader />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div className={styles.users}>
      <p className={styles.caption}>Список пользователей</p>
      <Flex direction='column' gap={32}>
        <Filter onSearch={onSearch} />
        <List users={users} />
      </Flex>
    </div>
  );
}
