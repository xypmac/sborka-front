'use client';

import { useSelector } from 'react-redux';

import MainLayout from '@/app/layouts/main-layout';
import Loader from '@/app/components/elements/loader';
import Error from '@/app/components/elements/error';
import User from '@/app/components/forms/user';
import { RootState } from '@/app/store';
import { User as UserType } from '@/app/store/users/types';

export default function ProfilePage() {
  const { user, isWait, error, isBuilder, isMasurer } = useSelector(
    (state: RootState) => ({
      user: state.session.user,
      isWait: state.session.isWaitSave,
      error: state.session.errorSave,
      isBuilder: state.session.isBuilder,
      isMasurer: state.session.isMasurer,
    })
  );

  return (
    <MainLayout>
      {isWait ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <User
          serverError={error}
          isWait={isWait}
          user={user as UserType}
          isShowCalendar={isBuilder || isMasurer}
        />
      )}
    </MainLayout>
  );
}
