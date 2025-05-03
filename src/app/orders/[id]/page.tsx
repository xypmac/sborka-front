import General from '@/app/containers/general';
import OrderPage from '@/app/containers/pages/order';

export default function Order() {
  return <General component={<OrderPage />} />;
}
