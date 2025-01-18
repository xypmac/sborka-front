import UsersComponent from '@/app/components/users';
import Auth from '@/app/components/auth';

export default function Users() {
  return <Auth component={<UsersComponent />} />;
}
