'use client';

import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import Link from 'next/link';
import { ru } from 'date-fns/locale';

import Flex from '@/app/components/elements/flex';
import Button from '@/app/components/elements/button';
import Select from '@/app/components/elements/select';
import { ORDER_STATUS_GROUP_FILTER } from '@/app/utils/constants';
import getOrderStatusText from '@/app/utils/get-order-status-text';

import { FilterProps } from './types';
import styles from './styles.module.scss';

export default function Filter({ isAllowCreateOrder, onSearch }: FilterProps) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const onSearchHandler = () => {
    const finalDate = date ? format(new Date(date), 'dd.MM.yyyy') : '';
    onSearch({ id, name, status, date: finalDate });
  };

  const onResetHandler = () => {
    setId('');
    setName('');
    setStatus('');
    setDate(null);
    onSearch({ id: '', name: '', status: '', date: '' });
  };

  const CustomInput = forwardRef(
    ({ value, onClick }: { value: any; onClick: any }, ref) => (
      <button className={styles.datepicker} onClick={onClick}>
        {value ? value : 'Выбрать дату'}
      </button>
    )
  );

  return (
    <Flex gap={12} align='center' justify='flex-start'>
      <div className={styles.select}>
        <Select
          defaultOption='Статус заказа'
          onSelect={(value: string) => setStatus(value)}
          options={ORDER_STATUS_GROUP_FILTER}
          error={null}
          value={getOrderStatusText(status)}
        />
      </div>
      <DatePicker
        locale={ru}
        selected={date}
        dateFormat='dd.MM.yyyy'
        onChange={(date) => setDate(date)}
        customInput={<CustomInput value={date} onClick={() => false} />}
      />
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
        <Link href='/orders/create' className={styles.link}>
          Создать заказ
        </Link>
      )}
    </Flex>
  );
}
