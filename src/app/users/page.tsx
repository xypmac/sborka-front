import General from '@/app/containers/general';
import UsersPage from '@/app/containers/pages/users';

export default function Users() {
  return <General component={<UsersPage />} />;
}
