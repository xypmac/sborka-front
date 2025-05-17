'use client';

import Button from '@/app/components/elements/button';
import Flex from '@/app/components/elements/flex';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';

import { Filter, List } from './children';
import { OrdersProps } from './types';
import styles from './styles.module.scss';

export default function Orders({
  isWait,
  currentPage,
  error,
  onSearch,
  orders,
  total,
  onLoad,
}: OrdersProps) {
  return isWait && currentPage === 0 ? (
    <Loader />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div className={styles.orders}>
      <p className={styles.caption}>Список заказов</p>
      <Flex direction='column' gap={32}>
        <Filter onSearch={onSearch} />
        <List orders={orders} />
        {orders.length > 0 && orders.length < total && (
          <Button text='Показать еще' type='button' onClick={onLoad} />
        )}
      </Flex>
    </div>
  );
}
