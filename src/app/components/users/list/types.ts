import { User } from '@/app/store/users/types';

export type ListProps = {
  isAdmin: boolean;
  users: User[];
};
