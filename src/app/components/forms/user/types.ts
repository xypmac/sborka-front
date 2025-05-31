import { User } from '@/app/store/users/types';

export type ProfileProps = {
  user: User;
  isAdmin: boolean;
  serverError?: string | null;
  isWait?: boolean;
  isWide?: boolean;
  isAllowEdit?: boolean;
  onActiveUser?: () => void;
  onUpdateUser?: ({
    phone,
    address,
    id,
  }: {
    phone: string;
    address: string;
    id: string;
  }) => void;
};

export type Fields = {
  phone: string;
  address?: string;
  type: string;
};
