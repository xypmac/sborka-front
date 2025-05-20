'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import Button from '@/app/components/elements/button';
import Flex from '@/app/components/elements/flex';
import { Filter, List } from '@/app/components/orders';
import { AppDispatch, RootState } from '@/app/store';
import { getOrders } from '@/app/store/orders/thunks';
import { Filter as FilterType } from '@/app/store/orders/types';
import { setFilter, clearState } from '@/app/store/orders';

export default function OrdersPage() {
  const {
    orders,
    error,
    total,
    currentPage,
    isWait,
    isAdmin,
    isTaskmaster,
    isSalon,
  } = useSelector((state: RootState) => ({
    orders: state.orders.list,
    error: state.orders.error,
    total: state.orders.total,
    currentPage: state.orders.currentPage,
    isWait: state.orders.isWait,
    isAdmin: state.session.isAdmin,
    isTaskmaster: state.session.isTaskmaster,
    isSalon: state.session.isSalon,
  }));

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());

    return () => {
      dispatch(clearState());
    };
  }, []);

  const onSearchHandler = (params: FilterType) => {
    dispatch(setFilter(params));
    dispatch(getOrders({ currentPage: 0 }));
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
            isAllowCreateOrder={isAdmin || isTaskmaster || isSalon}
            onSearch={onSearchHandler}
          />
          <Flex direction='column' gap={16} align='stretch'>
            <List orders={orders} />
            {orders.length > 0 && orders.length < total && (
              <Button
                text='Показать еще'
                type='button'
                onClick={() => dispatch(getOrders())}
              />
            )}
          </Flex>
        </Flex>
      )}
    </MainLayout>
  );
}
