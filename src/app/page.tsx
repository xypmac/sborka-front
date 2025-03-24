import OrdersList from '@/app/containers/orders';
import General from '@/app/containers/general';

export default function Home() {
  return <General component={<OrdersList />} />;
}
