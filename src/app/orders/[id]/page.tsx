import General from '@/app/containers/general';
import OrderContainers from '@/app/containers/order';

export default function Order() {
  return <General component={<OrderContainers />} />;
}
