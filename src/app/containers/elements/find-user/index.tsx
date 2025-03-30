'use client';

import { useState } from 'react';

import FindUserComponent from '@/app/components/elements/find-user';

import { User } from '@/app/store/users/type';

import { FindUserProps } from './types';

export default function FindUser({
  onSet,
  label,
  isSalon = false,
  users,
  placeholder,
  onShowModal,
  userID = '',
}: FindUserProps) {
  const [user, setUser] = useState<User | null>(
    users && users.length > 0
      ? users.find((user: User) => user.ID === (userID || '')) || null
      : null
  );

  return (
    <FindUserComponent
      isSalon={isSalon}
      onShowModal={onShowModal}
      onClear={() => {
        onSet('');
        setUser(null);
      }}
      onChoose={(user: User) => {
        onSet(user.ID);
        setUser(user);
      }}
      user={user}
      users={users}
      label={label}
      placeholder={placeholder}
    />
  );
}
