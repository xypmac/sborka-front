'use client';

import Link from 'next/link';

import Loader from '@/app/components/elements/loader';
import Empty from '@/app/components/elements/empty';
import Filter from '@/app/components/elements/orders-filter';
import Button from '@/app/components/elements/button';
import { Order } from '@/app/store/orders/type';
import getOrderStatusText from '@/app/utils/get-order-status-text';

import { UsersProps } from './types';
import styles from './styles.module.scss';

export default function Orders({
  isAllowCreateOrder,
  orders,
  isWait,
  total,
  loadMore,
}: UsersProps) {
  return (
    <div className={styles.list}>
      {isWait && <Loader borderRadius={5} />}
      <Filter isAllowCreateOrder={isAllowCreateOrder} />
      {orders.length === 0 ? (
        <Empty text='Ничего нет' mt={32} />
      ) : (
        <>
          <div className={styles.header}>
            <p>Номер заказа</p>
            <p>ФИО клиента</p>
            <p>Номер телефона клиента</p>
            <p>Адресс</p>
            <p>Статус</p>
            <p />
          </div>
          <div className={styles.list}>
            {orders.map((order: Order) => {
              return (
                <div className={styles.elem} key={order.ORDER_ID}>
                  <p>{order.ORDER_ID}</p>
                  <p>{order.FIO}</p>
                  <p>{order.PHONE_CLIENT}</p>
                  <p>{order.ADDRESS}</p>
                  <p>{getOrderStatusText(order.STATUS)}</p>
                  <p>
                    <Link href={`/orders/${order.ORDER_ID}`} target='_blank'>
                      Cмотреть заказ
                    </Link>
                  </p>
                </div>
              );
            })}
          </div>
          {orders.length < total && (
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
