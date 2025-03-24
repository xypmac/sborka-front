import { User } from '@/app/store/users/type';

export type SessionType = {
  user: User | null;
  token: string | null;
  error: string | null;
  errorSave: string | null;
  isAdmin: boolean;
  isTaskmaster: boolean;
  isBuilder: boolean;
  isMasurer: boolean;
  isSalon: boolean;
  isWaitSave: boolean;
  wait: boolean;
};
