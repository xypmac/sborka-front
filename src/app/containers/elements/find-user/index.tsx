'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FindUserComponent from '@/app/components/elements/find-user';
import { AppDispatch, RootState } from '@/app/store';
import { User } from '@/app/store/users/type';

import { FindUserProps } from './types';

export default function FindUser({
  onSet,
  label,
  onShowModal,
  userID = '',
}: FindUserProps) {
  const { users } = useSelector((state: RootState) => ({
    users: state.users.users,
  }));

  const [user, userUser] = useState<User | null>(
    users && users.length > 0
      ? users.find((user: User) => user.ID === (userID || '')) || null
      : null
  );

  const dispatch: AppDispatch = useDispatch();

  const onSetHandler = (id: string) => {
    const user = users.find((user: User) => user.ID === id);

    if (user) {
      onSet(id);
      userUser(user);
    } else {
      onSet('');
      userUser(null);
    }
  };

  return (
    <FindUserComponent
      onShowModal={onShowModal}
      onSet={onSetHandler}
      user={user}
      label={label}
      initialValue={userID || ''}
    />
  );
}
