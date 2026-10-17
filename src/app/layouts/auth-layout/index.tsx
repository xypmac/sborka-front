'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';

import Loader from '@/app/components/elements/loader';
import Wellcome from '@/app/pages/wellcome';
import { AppDispatch, RootState } from '@/app/store';
import { remind } from '@/app/store/session/thunks';
import { AuthLayoutProps } from './types';

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { token, user, wait } = useSelector((state: RootState) => ({
    token: state.session.token,
    user: state.session.user,
    wait: state.session.wait,
  }));

  const [isCheck, setIsCheck] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token && !user) dispatch(remind());
    setIsCheck(true);
  }, []);

  useEffect(() => {
    if (isCheck && !wait && !token && pathname !== '/') {
      router.replace('/');
    }
  }, [isCheck, wait, token, pathname]);

  if (isCheck && !wait) {
    return token ? children : <Wellcome />;
  }

  return <Loader />;
}
