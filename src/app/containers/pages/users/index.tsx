'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import MainLayout from '@/app/layouts/main-layout';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import Button from '@/app/components/elements/button';
import Flex from '@/app/components/elements/flex';
import { Filter, List } from '@/app/components/users';
import { AppDispatch, RootState } from '@/app/store';
import { getUsers } from '@/app/store/users/thunks';
import { Filter as FilterType } from '@/app/store/users/types';
import { clearState, setFilter } from '@/app/store/users';

export default function UsersPage() {
  const { users, error, total, currentPage, isWait, isAdmin, isTaskmaster, isMasurer, isBuilder, isSalon, sessionWait } =
    useSelector((state: RootState) => ({
      users: state.users.users,
      error: state.users.error,
      total: state.users.usersTotal,
      currentPage: state.users.currentPage,
      isWait: state.users.isWait,
      isAdmin: state.session.isAdmin,
      isTaskmaster: state.session.isTaskmaster,
      isMasurer: state.session.isMasurer,
      isBuilder: state.session.isBuilder,
      isSalon: state.session.isSalon,
      sessionWait: state.session.wait,
    }));

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (sessionWait) return;
    if (isMasurer || isBuilder || isSalon) {
      router.replace('/');
      return;
    }
    dispatch(getUsers());

    return () => {
      dispatch(clearState());
    };
  }, [isMasurer, sessionWait]);

  const onSearchHandler = (params: FilterType) => {
    dispatch(setFilter(params));
    dispatch(getUsers({ currentPage: 0 }));
  };

  return (
    <MainLayout>
      {isWait && currentPage === 0 ? (
        <Loader />
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <Flex direction='column' gap={32}>
          <Filter
            isAllowCreateUser={isAdmin || isTaskmaster}
            onSearch={onSearchHandler}
          />
          <Flex direction='column' gap={16} align='stretch'>
            <List isAdmin={isAdmin} users={users} />
            {users.length > 0 && users.length < total && (
              <Button onClick={() => dispatch(getUsers())}>Показать еще</Button>
            )}
          </Flex>
        </Flex>
      )}
    </MainLayout>
  );
}
