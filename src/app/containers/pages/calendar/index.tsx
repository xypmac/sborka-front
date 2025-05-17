'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Flex from '@/app/components/elements/flex';
import { Users, Orders } from '@/app/components/calendar';
import { AppDispatch, RootState } from '@/app/store';
import {
  getCalendarUsers,
  getCalendarOrders,
} from '@/app/store/calendar/thunks';
import { setFilter, setOrderFilter, clearState } from '@/app/store/calendar';

export default function Calendar() {
  const {
    users,
    orders,
    isWait,
    isWaitOrders,
    error,
    errorOrder,
    currentPage,
    currentPageOrders,
    total,
  } = useSelector((state: RootState) => ({
    users: state.calendar.users,
    orders: state.calendar.orders,
    isWait: state.calendar.wait,
    isWaitOrders: state.calendar.waitOrders,
    error: state.calendar.error,
    errorOrder: state.calendar.errorOrder,
    currentPage: state.calendar.currentPage,
    currentPageOrders: state.calendar.currentPageOrders,
    total: state.calendar.ordersTotal,
  }));

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalendarUsers(null));
    dispatch(getCalendarOrders(null));

    return () => {
      dispatch(clearState());
    };
  }, []);

  const onSearchUsersHandler = ({
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

  const onSearchOrdersHandler = ({
    search,
    status,
    dateFrom,
    dateTo,
    searchType,
  }: {
    search?: string;
    status?: string;
    dateTo?: string;
    dateFrom?: string;
    searchType?: string;
  }) => {
    dispatch(setOrderFilter({ search, status, dateFrom, dateTo, searchType }));
    dispatch(getCalendarOrders({ currentPage: 0 }));
  };

  return (
    <MainLayout>
      <Flex gap={24}>
        <Users
          error={error}
          isWait={isWait}
          currentPage={currentPage}
          users={users}
          onSearch={onSearchUsersHandler}
        />
        <Orders
          error={errorOrder}
          isWait={isWaitOrders}
          currentPage={currentPageOrders}
          orders={orders}
          onSearch={onSearchOrdersHandler}
          total={total}
          onLoad={() => dispatch(getCalendarOrders(null))}
        />
      </Flex>
    </MainLayout>
  );
}
