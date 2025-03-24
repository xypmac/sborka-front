'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import MainLayout from '@/app/layouts/main-layout';
import User from '@/app/components/forms/user';
import { AppDispatch, RootState } from '@/app/store';
import { getUserById } from '@/app/store/users/thunks';

export default function AnotherUser() {
  const { currentUser, isWait, error, isAdmin, isTaskmaster } = useSelector(
    (state: RootState) => ({
      currentUser: state.users.currentUser,
      isWait: state.users.wait,
      error: state.users.error,
      isAdmin: state.session.isAdmin,
      isTaskmaster: state.session.isTaskmaster,
    })
  );

  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(params.id as string));
  }, []);

  if (!isAdmin && !isTaskmaster) {
    return (
      <MainLayout>
        <p>У вас нет прав для просмотра этой страницы!</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {currentUser && (
        <User
          serverError={error}
          isWait={isWait}
          user={currentUser}
          isJustWatchMode={!isAdmin && !isTaskmaster}
        />
      )}
    </MainLayout>
  );
}
