'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import MainLayout from '@/app/layouts/main-layout';
import Flex from '@/app/components/elements/flex';
import { Users, Orders } from '@/app/components/calendar';
import { AppDispatch, RootState } from '@/app/store';
import {
  getCalendarUsers,
  getCalendarOrders,
} from '@/app/store/calendar/thunks';
import {
  setFilter,
  setOrderFilter,
  setOrderSort,
  clearState,
} from '@/app/store/calendar';

import styles from './styles.module.scss';

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
    isAdmin,
    isMasurer,
    isBuilder,
    isSalon,
    sessionWait,
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
    isAdmin: state.session.isAdmin,
    isMasurer: state.session.isMasurer,
    isBuilder: state.session.isBuilder,
    isSalon: state.session.isSalon,
    sessionWait: state.session.wait,
  }));

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (sessionWait) return;
    if (isMasurer || isBuilder || isSalon) { router.replace('/'); return; }
    dispatch(getCalendarUsers(null));
    dispatch(getCalendarOrders(null));

    return () => {
      dispatch(clearState());
    };
  }, [isMasurer, isBuilder, isSalon, sessionWait]);

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
    sort,
    dir,
    dateFrom,
    dateTo,
    searchType,
  }: {
    sort?: string;
    dir?: string;
    search?: string;
    status?: string;
    dateTo?: string;
    dateFrom?: string;
    searchType?: string;
  }) => {
    dispatch(setOrderFilter({ search, status, dateFrom, dateTo, searchType }));
    dispatch(
      setOrderSort({
        name: sort,
        dir,
      })
    );
    dispatch(getCalendarOrders({ currentPage: 0 }));
  };

  return (
    <MainLayout>
      <div className={styles.block}>
        <Users
          error={error}
          isAdmin={isAdmin}
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
      </div>
    </MainLayout>
  );
}
