import { User } from '@/app/store/users/types';

export type FindUserProps = {
  onShowModal: (id: string) => void;
  label: string;
  user: User | null;
  users: User[];
  isSalon: boolean;
  isDisabled: boolean;
  placeholder: string;
  onClear: () => void;
  onChoose: (user: User) => void;
};
