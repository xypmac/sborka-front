import { User } from '@/app/store/users/type';

export type ProfileProps = {
  user: User;
  serverError?: string | null;
  isWait?: boolean;
  isJustWatchMode?: boolean;
};

export type Fields = {
  phone: string;
  address?: string;
  type: string;
};
