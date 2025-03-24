import AddOrder from '@/app/containers/add-order';
import General from '@/app/containers/general';

export default function Orders() {
  return <General component={<AddOrder />} />;
}
