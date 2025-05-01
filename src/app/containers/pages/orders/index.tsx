'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import Button from '@/app/components/elements/button';
import Flex from '@/app/components/elements/flex';
import { Filter, List } from '@/app/components/elements/orders';
import { AppDispatch, RootState } from '@/app/store';
import { getOrders } from '@/app/store/orders/thunks';
import { setFilter, clearState } from '@/app/store/orders';

export default function OrdersPage() {
  const {
    orders,
    currentPage,
    isWait,
    error,
    total,
    isAdmin,
    isTaskmaster,
    isSalon,
  } = useSelector((state: RootState) => ({
    orders: state.orders.list,
    currentPage: state.orders.currentPage,
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

  const onSearchHandler = ({
    id,
    name,
    status,
    date,
  }: {
    id: string;
    name: string;
    status: string;
    date: string;
  }) => {
    dispatch(setFilter({ id, name, status, date }));
    dispatch(getOrders({ currentPage: 0 }));
  };

  return (
    <MainLayout>
      {isWait && currentPage === 0 ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Flex direction='column'>
          <Filter
            isAllowCreateOrder={isAdmin || isTaskmaster || isSalon}
            onSearch={onSearchHandler}
          />
          <List orders={orders} />
          {orders.length > 0 && orders.length < total && (
            <Button
              text='Показать еще'
              type='button'
              onClick={() => dispatch(getOrders(null))}
            />
          )}
        </Flex>
      )}
    </MainLayout>
  );
}
