'use client';

import { useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import User from '@/app/components/forms/user';
import { RootState } from '@/app/store';

export default function Profile() {
  const { user, isWait, error } = useSelector((state: RootState) => ({
    user: state.session.user,
    isWait: state.session.isWaitSave,
    error: state.session.errorSave,
  }));

  return (
    <MainLayout>
      {user && <User serverError={error} isWait={isWait} user={user} />}
    </MainLayout>
  );
}
