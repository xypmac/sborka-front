'use client';

import { useState, ReactElement, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import cn from 'classnames';
import { BiSortUp } from 'react-icons/bi';
import { BiSortDown } from 'react-icons/bi';

import { CgSortZa } from 'react-icons/cg';

import Select from '@/app/components/elements/select';
import Button from '@/app/components/elements/button';
import Flex from '@/app/components/elements/flex';
import getOrderStatusText from '@/app/utils/get-order-status-text';
import {
  CALENDAR_ORDERS_SEARCH_TYPE,
  ORDER_STATUS_GROUP_FILTER,
} from '@/app/utils/constants';

import { FilterProps } from './types';
import styles from './styles.module.scss';

export default function FilterOrders({ onSearch }: FilterProps): ReactElement {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [searchType, setSearchType] = useState('');
  const [sort, setSort] = useState('date');
  const [dir, setDir] = useState('DESC');

  const onSearchHandler = () => {
    onSearch({
      search,
      status,
      sort,
      dir,
      dateFrom: dateFrom ? format(new Date(dateFrom), 'dd.MM.yyyy') : '',
      dateTo: dateTo ? format(new Date(dateTo), 'dd.MM.yyyy') : '',
      searchType,
    });
  };

  const onResetHandler = () => {
    setSearch('');
    setStatus('');
    setSort('date');
    setDir('DESC');
    setDateFrom(null);
    setDateTo(null);
    setSearchType('');
    onSearch({
      search: '',
      sort: 'date',
      dir: 'DESC',
      status: '',
      dateFrom: '',
      dateTo: '',
      searchType: '',
    });
  };

  const CustomInput = forwardRef(
    (
      {
        value,
        onClick,
        isFrom,
      }: { value: any; onClick: any; isFrom?: boolean },
      ref
    ) => (
      <button className={styles.datepicker} onClick={onClick}>
        {value ? value : `Выбрать дату ${isFrom ? 'от' : 'до'}`}
      </button>
    )
  );

  const getPlaceholderHandler = (type: string) => {
    if (type === '1') {
      return 'Введите id';
    } else if (type === '2') {
      return 'Введите ФИО клиента';
    } else if (type === '3') {
      return 'Введите адрес';
    } else {
      return 'Поиск';
    }
  };

  const getSearchTypeTextHandker = (type: string) => {
    if (type === '1') {
      return 'Поиск по id';
    } else if (type === '2') {
      return 'Поиск по ФИО клиента';
    } else if (type === '3') {
      return 'Поиск по адресу';
    }
  };

  return (
    <Flex direction='column' gap={12} align='flex-start' justify='flex-start'>
      <Flex gap={12} align='center' justify='flex-start' flexWrap='wrap'>
        <div className={styles.select}>
          <Select
            defaultOption='Тип поиска'
            onSelect={(value: string) => setSearchType(value)}
            options={CALENDAR_ORDERS_SEARCH_TYPE}
            error={null}
            value={getSearchTypeTextHandker(searchType)}
          />
        </div>
        <input
          className={styles.input}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder={getPlaceholderHandler(searchType)}
        />
        <div className={styles.datepickerWrap}>
          <DatePicker
            locale={ru}
            selected={dateFrom}
            dateFormat='dd.MM.yyyy'
            onChange={(date) => setDateFrom(date)}
            customInput={
              <CustomInput value={dateFrom} onClick={() => false} isFrom />
            }
          />
        </div>
        <div className={styles.datepickerWrap}>
          <DatePicker
            locale={ru}
            selected={dateTo}
            dateFormat='dd.MM.yyyy'
            onChange={(date) => setDateTo(date)}
            customInput={<CustomInput value={dateTo} onClick={() => false} />}
          />
        </div>
        <div className={styles.select}>
          <Select
            defaultOption='Статус заказа'
            onSelect={(value: string) => setStatus(value)}
            options={ORDER_STATUS_GROUP_FILTER}
            error={null}
            value={getOrderStatusText(status)}
          />
        </div>
        <div className={styles.sort}>
          <p>Сортировать: </p>
          <span
            className={cn(styles.sortItem, sort === 'date' && styles.active)}
            onClick={() => {
              setSort('date');
              if (dir === 'DESC') setDir('ASC');
              else setDir('DESC');
            }}
          >
            по дате
            {sort === 'date' && dir === 'DESC' && <BiSortDown />}
            {sort === 'date' && dir === 'ASC' && <BiSortUp />}
          </span>
          <span
            className={cn(styles.sortItem, sort === 'status' && styles.active)}
            onClick={() => {
              setSort('status');
              if (dir === 'DESC') setDir('ASC');
              else setDir('DESC');
            }}
          >
            по статусу
            {sort === 'status' && dir === 'DESC' && <BiSortDown />}
            {sort === 'status' && dir === 'ASC' && <BiSortUp />}
          </span>
        </div>
      </Flex>
      <Flex gap={12} align='flex-start' justify='flex-start'>
        <Button onClick={onSearchHandler} text='Искать' type='button' />
        <Button onClick={onResetHandler} text='Сбросить' type='button' />
      </Flex>
    </Flex>
  );
}
