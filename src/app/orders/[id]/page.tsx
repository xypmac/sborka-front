import AuthLayout from '@/app/layouts/auth-layout';
import OrderPage from '@/app/containers/pages/order';

export default function Order() {
  return (
    <AuthLayout>
      <OrderPage />
    </AuthLayout>
  );
}
