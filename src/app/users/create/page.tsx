import AuthLayout from '@/app/layouts/auth-layout';
import CreateUserContainers from '@/app/containers/create-user';

export default function CreateUser() {
  return (
    <AuthLayout>
      <CreateUserContainers />
    </AuthLayout>
  );
}
