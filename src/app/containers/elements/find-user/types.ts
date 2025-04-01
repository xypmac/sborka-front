import { User } from '@/app/store/users/type';

export type FindUserProps = {
  label: string;

  placeholder: string;
  onSet: (id: string) => void;
  users: User[];
  userID?: string;
  isSalon?: boolean;
  isDisabled?: boolean;
  onShowModal: (id: string) => void;
};
