import General from '@/app/containers/general';
import ProfilePage from '@/app/containers/pages/profile';

export default function Profile() {
  return <General component={<ProfilePage />} />;
}
