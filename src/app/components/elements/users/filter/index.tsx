'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import Flex from '@/app/components/elements/flex';
import Button from '@/app/components/elements/button';
import Select from '@/app/components/elements/select';
import { AppDispatch } from '@/app/store';
import getUserGroupText from '@/app/utils/get-user-group-text';
import getUserActivityText from '@/app/utils/get-user-activity-text';
import { USERS_GROUP_FILTER, ACTIVITY_GROUP } from '@/app/utils/constants';

import { FilterProps } from './types';
import styles from './styles.module.scss';

export default function Filter({ isAllowCreateUser, onSearch }: FilterProps) {
  const [name, setName] = useState('');
  const [active, setActive] = useState('');
  const [group, setGroup] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const onSearchHandler = () => onSearch({ name, group, active });

  const onResetHandler = () => {
    setGroup('');
    setActive('');
    setName('');
    onSearch({ name: '', group: '', active: '' });
  };

  return (
    <Flex gap={12} align='center' justify='flex-start'>
      <div className={styles.select}>
        <Select
          defaultOption='Тип пользователя'
          onSelect={(value: string) => setGroup(value)}
          options={USERS_GROUP_FILTER}
          error={null}
          value={getUserGroupText(group)}
        />
      </div>
      <div className={styles.select}>
        <Select
          defaultOption='Активность'
          onSelect={(value: string) => setActive(value)}
          options={ACTIVITY_GROUP}
          error={null}
          value={getUserActivityText(active)}
        />
      </div>
      <input
        className={styles.input}
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder='Поиск по имени'
      />
      <Button onClick={onSearchHandler} text='Искать' type='button' />
      <Button onClick={onResetHandler} text='Сбросить' type='button' />
      {isAllowCreateUser && (
        <Link href='/users/create' className={styles.link}>
          Создать пользователя
        </Link>
      )}
    </Flex>
  );
}
