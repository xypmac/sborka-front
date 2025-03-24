'use client';

import { useSelector } from 'react-redux';

import MenuComponent from '@/app/components/elements/menu';
import { RootState } from '@/app/store';

export default function Menu() {
  const { isAdmin, isTaskmaster } = useSelector((state: RootState) => ({
    isAdmin: state.session.isAdmin,
    isTaskmaster: state.session.isTaskmaster,
  }));

  return <MenuComponent isAdmin={isAdmin} isTaskmaster={isTaskmaster} />;
}
