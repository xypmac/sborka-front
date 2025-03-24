'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import MainLayout from '@/app/layouts/main-layout';
import OrderForm from '@/app/components/forms/order';
import OrderComments from '@/app/components/elements/order-comments';
import OrderFiles from '@/app/components/elements/order-files';
import Heading from '@/app/components/elements/heading';
import { AppDispatch, RootState } from '@/app/store';
import {
  getOrderById,
  updateOrder,
  addComment,
  addFile,
} from '@/app/store/orders/thunks';
import Tabs from '@/app/components/elements/tabs';

export default function Order() {
  const [tab, setTab] = useState(1);

  const {
    currentOrder,
    isWait,
    isAdmin,
    isTaskmaster,
    isMasurer,
    isBuilder,
    isSalon,
  } = useSelector((state: RootState) => ({
    currentOrder: state.orders.currentOrder,
    isWait: state.orders.isWait,
    isAdmin: state.session.isAdmin,
    isTaskmaster: state.session.isTaskmaster,
    isBuilder: state.session.isBuilder,
    isMasurer: state.session.isMasurer,
    isSalon: state.session.isSalon,
  }));

  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(params.id as string));
  }, []);

  const onUpdateOrderHandler = (data: any) => {
    dispatch(
      updateOrder({
        ID: data.ORDER_ID,
        props: {
          PRICE_APP: data.PRICE_APP,
          PRICE: data.PRICE,
          STATUS: data.STATUS,
          DATE_WORK: data.DATE_WORK,
          DATE_END_WORK: data.DATE_END_WORK,
          DATE_CANCEL_WORK: data.DATE_CANCEL_WORK,
        },
      })
    );
  };
  console.log(currentOrder);
  return (
    <MainLayout>
      {currentOrder && (
        <>
          <Heading>
            <>
              Заказ
              <p style={{ fontWeight: '700', color: '#5c3bfe' }}>
                #{currentOrder.ORDER_ID}
              </p>
            </>
          </Heading>

          <Tabs onSetTab={(tab: number) => setTab(tab)} active={tab} />

          {tab === 1 && (
            <OrderForm
              isWait={isWait}
              order={currentOrder}
              isAdmin={isAdmin}
              isTaskmaster={isTaskmaster}
              isBuilder={isBuilder}
              isMasurer={isMasurer}
              isSalon={isSalon}
              onUpdateOrder={onUpdateOrderHandler}
            />
          )}

          {tab === 2 && (
            <OrderComments
              COMMENT_SALON={currentOrder.COMMENT_SALON || []}
              COMMENT_WORKER={currentOrder.COMMENT_WORKER || []}
              isSalon={isSalon}
              isBuilder={isBuilder}
            />
          )}

          {tab === 3 && (
            <OrderFiles
              isBuilder={isBuilder}
              isSalon={isSalon}
              isMasurer={isMasurer}
              PHOTO_ROOM={currentOrder.PHOTO_ROOM || []}
              PHOTO_REPORT={currentOrder.PHOTO_REPORT || []}
              SKETCH={currentOrder.SKETCH || []}
              MEASURING={currentOrder.MEASURING || []}
              onAddFile={({ file, type }: { file: any; type: string }) =>
                dispatch(
                  addFile({
                    ID: currentOrder.ORDER_ID,
                    file,
                    type,
                  })
                )
              }
            />
          )}
        </>
      )}
    </MainLayout>
  );
}
