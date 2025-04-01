'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import Users from '@/app/components/elements/users';
import { AppDispatch, RootState } from '@/app/store';
import { getUsers } from '@/app/store/users/thunks';
import { setFilter, clearState } from '@/app/store/users';

export default function Profile() {
  const { isAdmin, isTaskmaster, users, page, isWait, error, total } =
    useSelector((state: RootState) => ({
      isAdmin: state.session.isAdmin,
      isTaskmaster: state.session.isTaskmaster,
      users: state.users.users,
      page: state.users.currentPage,
      isWait: state.users.wait,
      error: state.users.error,
      total: state.users.usersTotal,
    }));

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilter({ name: '', group: '', active: '' }));
    dispatch(getUsers({ name: '', group: '', active: '', currentPage: 0 }));

    return () => {
      dispatch(clearState());
    };
  }, []);

  return (
    <MainLayout>
      {isWait && page === 0 ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Users
          isAllowCreateUser={isAdmin || isTaskmaster}
          users={users}
          total={total}
          isWait={isWait}
          loadMore={() => dispatch(getUsers(null))}
        />
      )}
    </MainLayout>
  );
}
