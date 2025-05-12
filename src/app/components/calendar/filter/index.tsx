'use client';

import { useState, ReactElement, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

import Select from '@/app/components/elements/select';
import Button from '@/app/components/elements/button';
import Error from '@/app/components/elements/error';
import Flex from '@/app/components/elements/flex';
import getUserGroupText from '@/app/utils/get-user-group-text';
import getDayStatusText from '@/app/utils/get-day-status-text';
import { CALENDAR_USERS_GROUP_FILTER, DAY_STATUS } from '@/app/utils/constants';

import { FilterProps } from './types';
import styles from './styles.module.scss';

export default function Filter({ onSearch }: FilterProps): ReactElement {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const onSearchHandler = () => {
    if (date) {
      onSearch({
        date: date ? format(new Date(date), 'dd.MM.yyyy') : '',
        name,
        group,
        status,
      });
    } else {
      setDateError('Обязательно поле');
    }
  };

  const onResetHandler = () => {
    setName('');
    setStatus('');
    setGroup('');
    setDate(null);
    setDateError(null);
    onSearch({
      date: format(new Date(), 'dd.MM.yyyy'),
      name: '',
      group: '',
      status: '',
    });
  };

  const CustomInput = forwardRef(
    ({ value, onClick }: { value: any; onClick: any }, ref) => (
      <button className={styles.datepicker} onClick={onClick}>
        {value ? value : 'Выбрать дату'}
      </button>
    )
  );

  return (
    <Flex gap={12} align='flex-start' justify='flex-start'>
      <input
        className={styles.input}
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder='Поиск по имени'
      />
      <div className={styles.select}>
        <Select
          defaultOption='Тип пользователя'
          onSelect={(value: string) => setGroup(value)}
          options={CALENDAR_USERS_GROUP_FILTER}
          error={null}
          value={getUserGroupText(group)}
        />
      </div>
      <div className={styles.datepickerWrap}>
        <DatePicker
          locale={ru}
          selected={date}
          dateFormat='dd.MM.yyyy'
          onChange={(date) => {
            setDate(date);
            setDateError(null);
          }}
          customInput={<CustomInput value={date} onClick={() => false} />}
        />
        {dateError && (
          <div className={styles.error}>
            <Error error={dateError} />
          </div>
        )}
      </div>
      <div className={styles.select}>
        <Select
          defaultOption='Статус'
          onSelect={(value: string) => setStatus(value)}
          options={DAY_STATUS}
          error={null}
          value={getDayStatusText(status)}
        />
      </div>
      <Button onClick={onSearchHandler} text='Искать' type='button' />
      <Button onClick={onResetHandler} text='Сбросить' type='button' />
    </Flex>
  );
}
