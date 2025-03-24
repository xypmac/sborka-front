'use client';

import { useDispatch, useSelector } from 'react-redux';

import AddCommentComponent from '@/app/components/elements/add-comment';
import { AppDispatch, RootState } from '@/app/store';
import { addComment } from '@/app/store/orders/thunks';

export default function AddComment({ isSalon = false }: { isSalon?: boolean }) {
  const { currentOrder } = useSelector((state: RootState) => ({
    currentOrder: state.orders.currentOrder,
  }));

  const dispatch: AppDispatch = useDispatch();

  if (!currentOrder) {
    return null;
  }

  return (
    <AddCommentComponent
      ID={currentOrder.ORDER_ID}
      onAddComment={({ ID, comment }: { ID: number; comment: string }) =>
        dispatch(addComment({ ID, comment, isSalon }))
      }
    />
  );
}
