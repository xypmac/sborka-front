'use client';

import { useState } from 'react';
import Link from 'next/link';

import Flex from '@/app/components/elements/flex';
import Button from '@/app/components/elements/button';
import Select from '@/app/components/elements/select';
import InputSimple from '@/app/components/elements/input-simple';
import { Active, Filter as FilterType } from '@/app/store/users/types';
import getUserGroupText from '@/app/utils/get-user-group-text';
import getUserActivityText from '@/app/utils/get-user-activity-text';
import { USERS_GROUP_FILTER, ACTIVITY_GROUP } from '@/app/utils/constants';

import { FilterProps } from './types';

const initialParams: FilterType = {
  name: '',
  active: '',
  group: '0',
};

export default function Filter({ isAllowCreateUser, onSearch }: FilterProps) {
  const [params, setParams] = useState<FilterType>(initialParams);

  const onClearHandler = () => {
    setParams(initialParams);
    onSearch(initialParams);
  };

  return (
    <Flex gap={12} align='center' justify='flex-start'>
      <Select
        defaultOption='Тип пользователя'
        onSelect={(group: string) => setParams({ ...params, group })}
        options={USERS_GROUP_FILTER}
        error={null}
        value={getUserGroupText(params.group)}
        width={200}
      />
      <Select
        defaultOption='Активность'
        onSelect={(active: string) =>
          setParams({ ...params, active: active as Active })
        }
        options={ACTIVITY_GROUP}
        error={null}
        value={getUserActivityText(params.active)}
        width={200}
      />
      <InputSimple
        id='name'
        onChange={(e) => setParams({ ...params, name: e.target.value })}
        value={params.name}
        placeholder='Поиск по имени'
      />
      <Button onClick={() => onSearch(params)}>Искать</Button>
      <Button onClick={onClearHandler}>Сбросить</Button>
      {isAllowCreateUser && (
        <Link href='/users/create' className='link'>
          Создать пользователя
        </Link>
      )}
    </Flex>
  );
}
