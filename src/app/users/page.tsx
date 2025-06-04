import AuthLayout from '@/app/layouts/auth-layout';
import UsersPage from '@/app/containers/pages/users';

export default function Users() {
  return (
    <AuthLayout>
      <UsersPage />
    </AuthLayout>
  );
}
