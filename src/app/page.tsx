import Main from '@/app/components/main';
import Auth from '@/app/components/auth';

export default function Users() {
  return <Auth component={<Main />} />;
}
