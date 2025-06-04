import AuthLayout from '@/app/layouts/auth-layout';
import CreateOrderContainers from '@/app/containers/create-order';

export default function CreateOrder() {
  return (
    <AuthLayout>
      <CreateOrderContainers />
    </AuthLayout>
  );
}
