import AnotherUser from '@/app/containers/another-user';
import General from '@/app/containers/general';

export default function User() {
  return <General component={<AnotherUser />} />;
}
