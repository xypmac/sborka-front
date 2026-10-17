import Link from 'next/link';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import cn from 'classnames';

import Label from '@/app/components/elements/label';
import Empty from '@/app/components/elements/empty';
import { Order } from '@/app/store/orders/types';
import getOrderStatusText from '@/app/utils/get-order-status-text';

import { ListProps } from './types';
import styles from './styles.module.scss';

export default function List({ orders, isAdmin, onDelete }: ListProps) {
  return orders.length === 0 ? (
    <Empty>Ничего нет</Empty>
  ) : (
    <div>
      <div className={styles.header}>
        <p>Номер заказа</p>
        <p>ФИО клиента</p>
        <p>Номер клиента</p>
        <p>Адрес</p>
        <p>Статус</p>
      </div>
      <div>
        {orders.map((order: Order) => {
          return (
            <div className={styles.elem} key={order.ORDER_ID}>
              <div className={styles.action}>
                <Link href={`/orders/${order.ORDER_ID}`} target='_blank'>
                  <FaArrowAltCircleRight />
                  {order.ORDER_ID}
                </Link>
              </div>
              <div>
                <div className={styles.mobileTitle}>
                  <Label>ФИО клиента: </Label>
                </div>
                {order.FIO}
              </div>
              <div>
                <div className={styles.mobileTitle}>
                  <Label>Номер клиента: </Label>
                </div>
                {order.PHONE_CLIENT}
              </div>
              <div>
                <div className={styles.mobileTitle}>
                  <Label>Адрес: </Label>
                </div>
                {order.ADDRESS}
              </div>
              <div
                className={cn(
                  order.STATUS === '5' && styles.new,
                  order.STATUS === '8' && styles.stoped
                )}
              >
                <div className={styles.mobileTitle}>
                  <Label>Статус: </Label>
                </div>
                {getOrderStatusText(order.STATUS)}
              </div>
              {isAdmin && (
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    if (window.confirm(`Удалить заказ #${order.ORDER_ID}?`)) {
                      onDelete?.(order.ORDER_ID);
                    }
                  }}
                >
                  Удалить
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
