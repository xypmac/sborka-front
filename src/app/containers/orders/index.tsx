'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import Orders from '@/app/components/elements/orders';
import { AppDispatch, RootState } from '@/app/store';
import { getOrders } from '@/app/store/orders/thunks';
import { clearState } from '@/app/store/orders';

export default function Profile() {
  const { orders, page, isWait, error, total, isAdmin, isTaskmaster, isSalon } =
    useSelector((state: RootState) => ({
      orders: state.orders.list,
      page: state.orders.currentPage,
      error: state.orders.error,
      total: state.orders.total,
      isWait: state.orders.isWait,
      isAdmin: state.session.isAdmin,
      isTaskmaster: state.session.isTaskmaster,
      isSalon: state.session.isSalon,
    }));

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders(null));

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
        <Orders
          isAllowCreateOrder={isAdmin || isTaskmaster || isSalon}
          orders={orders}
          total={total}
          isWait={isWait}
          loadMore={() => dispatch(getOrders(null))}
        />
      )}
    </MainLayout>
  );
}
