import General from '@/app/containers/general';
import CreateOrderContainers from '@/app/containers/create-order';

export default function CreateOrder() {
  return <General component={<CreateOrderContainers />} />;
}
