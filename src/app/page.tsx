import Main from '@/app/containers/main';
import Wellcome from '@/app/containers/wellcome';

export default function Home() {
  const isLogin = false;

  return isLogin ? <Main /> : <Wellcome />;
}
