'use client';

import MainLayout from '@/app/layouts/main-layout';
import Button from '@/app/components/button';

export default function Users() {
  return (
    <MainLayout>
      <Button
        text='Добавить пользователя'
        type='button'
        onClick={() => alert('s')}
      />
    </MainLayout>
  );
}
