'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import UserInformation from '@/app/containers/elements/user-information';
import Loader from '@/app/components/elements/loader';
import Wellcome from '@/app/pages/wellcome';
import { AppDispatch, RootState } from '@/app/store';

import { remind } from '@/app/store/session/thunks';

export default function General({ component }: { component: ReactNode }) {
  const { token, user, wait } = useSelector((state: RootState) => ({
    token: state.session.token,
    user: state.session.user,
    wait: state.session.wait,
  }));

  const [isCheck, setIsCheck] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!token && !user) {
      dispatch(remind());
    }

    setIsCheck(true);
  }, []);

  if (isCheck && !wait) {
    return token ? <>{component}</> : <Wellcome />;
  }

  return <Loader />;
}
