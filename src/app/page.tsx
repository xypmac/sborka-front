import General from '@/app/containers/general';
import OrdersPage from '@/app/containers/pages/orders';

export default function Home() {
  return <General component={<OrdersPage />} />;
}
