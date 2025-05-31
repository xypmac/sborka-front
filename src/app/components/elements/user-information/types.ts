import { User } from '@/app/store/users/types';

export type UserComponentProps = {
  isLoading: boolean;
  isWaitUpdating: boolean;
  error: string;
  isAdmin: boolean;
  user: User | null;
  onHide: () => void;
  onActiveUser: () => void;
  onUpdateUser: ({
    phone,
    address,
    id,
  }: {
    phone: string;
    address: string;
    id: string;
  }) => void;
};
