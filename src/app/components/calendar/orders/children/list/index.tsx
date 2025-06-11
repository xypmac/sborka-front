'use client';

import cn from 'classnames';
import Link from 'next/link';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import Empty from '@/app/components/elements/empty';
import { Order } from '@/app/store/orders/types';
import Flex from '@/app/components/elements/flex';
import getOrderStatusText from '@/app/utils/get-order-status-text';

import { ListProps } from './types';
import styles from './styles.module.scss';

export default function List({ orders }: ListProps) {
  return orders.length === 0 ? (
    <Empty>Ничего нет</Empty>
  ) : (
    <div className={styles.list}>
      <Flex direction='column'>
        {orders.map((order: Order) => {
          return (
            <div className={styles.elem} key={order.ORDER_ID}>
              <p className={styles.action}>
                <Link href={`/orders/${order.ORDER_ID}`} target='_blank'>
                  <FaArrowAltCircleRight />
                  {order.ORDER_ID}
                </Link>
              </p>
              <p>{order.FIO}</p>
              <p>{order.PHONE_CLIENT}</p>
              <p>{order.ADDRESS}</p>
              <p>{order.DATE_WORK || '-'}</p>
              <p
                className={cn(
                  order.STATUS === '5' && styles.new,
                  order.STATUS === '8' && styles.stoped
                )}
              >
                {getOrderStatusText(order.STATUS)}
              </p>
            </div>
          );
        })}
      </Flex>
    </div>
  );
}
