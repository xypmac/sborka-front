'use client';

import { useState, forwardRef, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import Link from 'next/link';
import { ru } from 'date-fns/locale';

import Button from '@/app/components/elements/button';
import Select from '@/app/components/elements/select';
import { AppDispatch } from '@/app/store';
import { getOrders } from '@/app/store/orders/thunks';
import { setFilter } from '@/app/store/orders';
import { ORDER_STATUS_GROUP } from '@/app/utils/constants';
import getOrderStatusText from '@/app/utils/get-order-status-text';

import styles from './styles.module.scss';

export default function UsersFilter({
  isAllowCreateOrder,
}: {
  isAllowCreateOrder: boolean;
}) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());

  const dispatch: AppDispatch = useDispatch();

  const onResetHandler = () => {
    setId('');
    setName('');
    setStatus('');
    setDate(new Date());
    dispatch(setFilter({ id: '', name: '', status: '', date: '' }));
    dispatch(getOrders({ currentPage: 0 }));
  };

  const ref = useRef<HTMLButtonElement | null>(null);

  const CustomInput = forwardRef(
    ({ value, onClick }: { value: any; onClick: any }, ref) => (
      <button className={styles.datepicker} onClick={onClick}>
        {value}
      </button>
    )
  );

  const onSearchHandler = () => {
    const result = date ? format(new Date(date), 'dd.MM.yyyy') : '';

    dispatch(setFilter({ id, name, status, date: result }));
    dispatch(getOrders({ currentPage: 0 }));
  };

  return (
    <div className={styles.filter}>
      <div className={styles.select}>
        <Select
          defaultOption='Статус заказа'
          onSelect={(value: string) => setStatus(value)}
          options={ORDER_STATUS_GROUP}
          error={null}
          value={getOrderStatusText(status)}
        />
      </div>
      <div>
        <DatePicker
          locale={ru}
          selected={date}
          dateFormat='dd.MM.yyyy'
          onChange={(date) => setDate(date)}
          customInput={<CustomInput value={date} onClick={() => false} />}
        />
      </div>
      <input
        className={styles.input}
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder='Поиск по ФИО клиента'
      />
      <input
        className={styles.input}
        onChange={(e) => setId(e.target.value.replace(/\D/, ''))}
        value={id}
        placeholder='Поиск по номеру заказа'
      />
      <Button onClick={onSearchHandler} text='Искать' type='button' />
      <Button onClick={onResetHandler} text='Сбросить' type='button' />
      {isAllowCreateOrder && (
        <Link className={styles.link} href='/orders/add'>
          Создать заказ
        </Link>
      )}
    </div>
  );
}
