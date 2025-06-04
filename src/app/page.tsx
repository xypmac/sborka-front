import AuthLayout from '@/app/layouts/auth-layout';
import OrdersPage from '@/app/containers/pages/orders';

export default function Home() {
  return (
    <AuthLayout>
      <OrdersPage />
    </AuthLayout>
  );
}
