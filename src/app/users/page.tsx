import UsersList from '@/app/containers/users';
import General from '@/app/containers/general';

export default function Users() {
  return <General component={<UsersList />} />;
}
