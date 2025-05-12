'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import Flex from '@/app/components/elements/flex';
import { Filter, List } from '@/app/components/calendar';
import { AppDispatch, RootState } from '@/app/store';
import { getCalendarUsers } from '@/app/store/calendar/thunks';
import { setFilter, clearState } from '@/app/store/calendar';

export default function Calendar() {
  const { users, isWait, error, currentPage } = useSelector(
    (state: RootState) => ({
      users: state.calendar.users,
      isWait: state.calendar.wait,
      error: state.calendar.error,
      currentPage: state.calendar.currentPage,
    })
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalendarUsers(null));

    return () => {
      dispatch(clearState());
    };
  }, []);

  const onSearchHandler = ({
    date,
    name,
    group,
    status,
  }: {
    date: string;
    name?: string;
    group?: string;
    status?: string;
  }) => {
    const data: any = { date };
    if (name) data['name'] = name;
    if (group) data['group'] = group;
    if (status) data['status'] = status;

    dispatch(setFilter({ data }));
    dispatch(getCalendarUsers(data));
  };

  return (
    <MainLayout>
      {isWait && currentPage === 0 ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Flex direction='column' gap={32}>
          <Filter onSearch={onSearchHandler} />
          <List users={users} />
        </Flex>
      )}
    </MainLayout>
  );
}
