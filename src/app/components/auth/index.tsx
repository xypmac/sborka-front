'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import nookies from 'nookies';

import Loader from '@/app/components/loader';
import Wellcome from '@/app/components/wellcome';
import { RootState } from '@/app/store';

export default function Auth({ component }: { component: ReactNode }) {
  const { tokenFromStore } = useSelector((state: RootState) => ({
    tokenFromStore: state.session.token,
  }));

  const [isCheck, setIsCheck] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(tokenFromStore || nookies.get().token || null);
    setIsCheck(true);
  }, [tokenFromStore]);

  if (isCheck) {
    if (token) return component;
    else return <Wellcome />;
  }

  return <Loader />;
}
