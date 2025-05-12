'use client';

import { useDispatch, useSelector } from 'react-redux';

import AddCommentComponent from '@/app/components/add-comment';
import { AppDispatch, RootState } from '@/app/store';
import { addComment } from '@/app/store/orders/thunks';

export default function AddComment() {
  const { currentOrder, isSalon } = useSelector((state: RootState) => ({
    currentOrder: state.orders.currentOrder,
    isSalon: state.session.isSalon,
  }));

  const dispatch: AppDispatch = useDispatch();

  const onAddCommentHandler = ({
    ID,
    comment,
  }: {
    ID: number;
    comment: string;
  }) => {
    dispatch(addComment({ ID, comment, isSalon }));
  };

  if (!currentOrder) {
    return null;
  }

  return (
    <AddCommentComponent
      ID={currentOrder.ORDER_ID}
      onAddComment={onAddCommentHandler}
    />
  );
}
