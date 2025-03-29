import General from '@/app/containers/general';
import CreateOrder from '@/app/containers/create-order';

export default function Order() {
  return <General component={<CreateOrder />} />;
}
