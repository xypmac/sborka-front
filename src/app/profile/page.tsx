import Profile from '@/app/containers/profile';
import General from '@/app/containers/general';

export default function Home() {
  return <General component={<Profile />} />;
}
