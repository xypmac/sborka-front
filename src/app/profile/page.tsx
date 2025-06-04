import AuthLayout from '@/app/layouts/auth-layout';
import ProfilePage from '@/app/containers/pages/profile';

export default function Profile() {
  return (
    <AuthLayout>
      <ProfilePage />
    </AuthLayout>
  );
}
