'use client';

import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import Link from 'next/link';
import { ru } from 'date-fns/locale';

import Flex from '@/app/components/elements/flex';
import Button from '@/app/components/elements/button';
import DatepickerPlaceholder from '@/app/components/elements/datepicker-placohder';
import InputSimple from '@/app/components/elements/input-simple';
import Select from '@/app/components/elements/select';
import { Filter as FilterType } from '@/app/store/orders/types';
import { ORDER_STATUS_GROUP_FILTER } from '@/app/utils/constants';
import getOrderStatusText from '@/app/utils/get-order-status-text';

import { FilterProps } from './types';

const initialParams: FilterType = {
  id: '',
  name: '',
  status: '',
  date: null,
};

export default function Filter({ isAllowCreateOrder, onSearch }: FilterProps) {
  const [params, setParams] = useState<FilterType>(initialParams);
  const [date, setDate] = useState<Date | null>(null);

  const CustomInput = forwardRef(
    ({ value, onClick }: { value: any; onClick: any }, ref) => (
      <DatepickerPlaceholder onClick={onClick} value={value} />
    )
  );

  return (
    <Flex gap={12} align='center' justify='flex-start'>
      <Select
        defaultOption='Статус заказа'
        onSelect={(status: string) => setParams({ ...params, status })}
        options={ORDER_STATUS_GROUP_FILTER}
        error={null}
        value={getOrderStatusText(params.status)}
        width={200}
      />
      <div className='datepickerWrap'>
        <DatePicker
          locale={ru}
          selected={date}
          dateFormat='dd.MM.yyyy'
          onChange={(date) => setDate(date)}
          customInput={<CustomInput value={date} onClick={() => false} />}
        />
      </div>
      <InputSimple
        id='name'
        onChange={(e) => setParams({ ...params, name: e.target.value })}
        value={params.name}
        placeholder='Поиск по ФИО клиента'
      />
      <InputSimple
        id='id'
        onChange={(e) =>
          setParams({ ...params, id: e.target.value.replace(/\D/, '') })
        }
        value={params.id}
        placeholder='Поиск по номеру заказа'
      />
      <Button
        onClick={() =>
          onSearch({
            ...params,
            date: date ? format(new Date(date), 'dd.MM.yyyy') : '',
          })
        }
        text='Искать'
        type='button'
      />
      <Button
        onClick={() => {
          setParams(initialParams);
          setDate(null);
          onSearch(initialParams);
        }}
        text='Сбросить'
        type='button'
      />
      {isAllowCreateOrder && (
        <Link href='/orders/create' className='link'>
          Создать заказ
        </Link>
      )}
    </Flex>
  );
}
