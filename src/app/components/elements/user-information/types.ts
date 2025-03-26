import { User } from '@/app/store/users/type';

export type UserComponentProps = {
  isLoading: boolean;
  isWaitUpdating: boolean;
  error: string;
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
