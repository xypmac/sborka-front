'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import Button from '@/app/components/elements/button';
import Flex from '@/app/components/elements/flex';
import { Filter, List } from '@/app/components/users';
import { AppDispatch, RootState } from '@/app/store';
import { getUsers } from '@/app/store/users/thunks';
import { clearState, setFilter } from '@/app/store/users';

export default function UsersPage() {
  const { users, currentPage, isWait, error, total, isAdmin, isTaskmaster } =
    useSelector((state: RootState) => ({
      users: state.users.users,
      currentPage: state.users.currentPage,
      isWait: state.users.wait,
      error: state.users.error,
      total: state.users.usersTotal,
      isAdmin: state.session.isAdmin,
      isTaskmaster: state.session.isTaskmaster,
    }));

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(null));

    return () => {
      dispatch(clearState());
    };
  }, []);

  const onSearchHandler = ({
    name,
    group,
    active,
  }: {
    name: string;
    group: string;
    active: string;
  }) => {
    dispatch(setFilter({ name, group, active }));
    dispatch(getUsers({ currentPage: 0 }));
  };

  return (
    <MainLayout>
      {isWait && currentPage === 0 ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Flex direction='column' gap={32}>
          <Filter
            isAllowCreateUser={isAdmin || isTaskmaster}
            onSearch={onSearchHandler}
          />
          <List users={users} />
          {users.length > 0 && users.length < total && (
            <Button
              text='Показать еще'
              type='button'
              onClick={() => dispatch(getUsers(null))}
            />
          )}
        </Flex>
      )}
    </MainLayout>
  );
}
