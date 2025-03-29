import { User } from '@/app/store/users/type';

export type FindUserProps = {
  onSet: (id: string) => void;
  onShowModal: (id: string) => void;
  label: string;
  initialValue: string;
  user: User | null;
};
