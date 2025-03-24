import { User } from '@/app/store/users/type';

export type UsersProps = {
  users: User[];
  total: number;
  isWait: boolean;
  loadMore: () => void;
};
