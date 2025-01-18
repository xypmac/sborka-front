'use client';

import MainLayout from '@/app/layouts/main-layout';
import Button from '@/app/components/button';

export default function Main() {
  return (
    <MainLayout>
      <Button text='Добавить заказ' type='button' onClick={() => alert('s')} />
    </MainLayout>
  );
}
