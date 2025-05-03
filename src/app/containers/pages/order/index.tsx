'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import Loader from '@/app/components/elements/loader';
import UserInformation from '@/app/containers/elements/user-information';
import MainLayout from '@/app/layouts/main-layout';
import OrderForm from '@/app/components/forms/order';
import OrderComments from '@/app/components/elements/order-comments';
import OrderFiles from '@/app/components/elements/order-files';
import Heading from '@/app/components/elements/heading';
import OrderTabs from '@/app/components/elements/order-tabs';
import { AppDispatch, RootState } from '@/app/store';
import {
  getOrderById,
  updateOrder,
  addFile,
  removeFile,
} from '@/app/store/orders/thunks';
import { getUsers } from '@/app/store/users/thunks';

export default function Order() {
  const [tab, setTab] = useState(1);
  const [userId, setUserId] = useState('');
  const {
    currentOrder,
    users,
    isUsersWait,
    isWait,
    isWaitUpdate,
    isWaitFile,
    isAdmin,
    isTaskmaster,
    isMasurer,
    isBuilder,
    isSalon,
  } = useSelector((state: RootState) => ({
    currentOrder: state.orders.currentOrder,
    users: state.users.users,
    isUsersWait: state.users.wait,
    isWait: state.orders.isWait,
    isWaitUpdate: state.orders.isWaitUpdate,
    isWaitFile: state.orders.isWaitFile,
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
    dispatch(
      getUsers({ name: '', group: '', active: '', currentPage: 0, isAll: true })
    );
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
          WORKER: data.WORKER,
          SALON: data.SALON,
          MEASURER: data.MEASURER,
        },
      })
    );
  };

  const onAddFileHandler = ({ file, type }: { file: any; type: string }) => {
    if (currentOrder) {
      dispatch(
        addFile({
          ID: currentOrder.ORDER_ID,
          file,
          type,
        })
      );
    }
  };

  const onRemoveFileHandler = ({ id, type }: { id: number; type: string }) => {
    if (currentOrder) {
      dispatch(removeFile({ ID: currentOrder.ORDER_ID, fileId: id, type }));
    }
  };

  return (
    <MainLayout>
      {isUsersWait || isWait ? (
        <Loader borderRadius={5} />
      ) : (
        <>
          {currentOrder && (
            <Heading>
              <>
                Заказ
                <p style={{ fontWeight: '700', color: '#5c3bfe' }}>
                  #{currentOrder.ORDER_ID}
                </p>
              </>
            </Heading>
          )}
          <OrderTabs onSetTab={(tab: number) => setTab(tab)} active={tab} />
          {userId !== '' && (
            <UserInformation id={userId} onHide={() => setUserId('')} />
          )}
          {tab === 1 && currentOrder && (
            <OrderForm
              isWait={isWaitUpdate}
              order={currentOrder}
              isAdmin={isAdmin}
              isTaskmaster={isTaskmaster}
              isBuilder={isBuilder}
              isMasurer={isMasurer}
              isSalon={isSalon}
              onShowModal={(id: string) => setUserId(id)}
              onUpdateOrder={onUpdateOrderHandler}
              users={users}
            />
          )}
          {tab === 2 && currentOrder && (
            <OrderComments
              COMMENT_SALON={currentOrder.COMMENT_SALON || []}
              COMMENT_WORKER={currentOrder.COMMENT_WORKER || []}
              isSalon={isSalon}
              isBuilder={isBuilder}
            />
          )}
          {tab === 3 && currentOrder && (
            <OrderFiles
              isWaitFile={isWaitFile}
              isBuilder={isBuilder}
              isSalon={isSalon}
              isAdmin={isAdmin}
              isTaskmaster={isTaskmaster}
              isMasurer={isMasurer}
              PHOTO_ROOM={currentOrder.PHOTO_ROOM || []}
              PHOTO_REPORT={currentOrder.PHOTO_REPORT || []}
              SKETCH={currentOrder.SKETCH || []}
              MEASURING={currentOrder.MEASURING || []}
              onAddFile={onAddFileHandler}
              onRemoveFile={onRemoveFileHandler}
            />
          )}
        </>
      )}
    </MainLayout>
  );
}
