import General from '@/app/containers/general';
import CreateUserContainers from '@/app/containers/create-user';

export default function CreateUser() {
  return <General component={<CreateUserContainers />} />;
}
