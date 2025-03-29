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

  const onChooseHandler = (user: User) => {
    onSet(user.ID);
    setUser(user);
  };

  const onClearHandler = () => {
    onSet('');
    setUser(null);
  };

  return (
    <FindUserComponent
      isSalon={isSalon}
      onShowModal={onShowModal}
      onClear={onClearHandler}
      onChoose={onChooseHandler}
      user={user}
      users={users}
      label={label}
      placeholder={placeholder}
    />
  );
}
