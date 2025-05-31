import { CalendarUser } from '@/app/store/calendar/type';

export type UserProps = {
  isWait: boolean;
  isAdmin: boolean;
  currentPage: number;
  error: null | string;
  users: CalendarUser[];
  onSearch: ({
    date,
    name,
    group,
    status,
  }: {
    date: string;
    name?: string;
    group?: string;
    status?: string;
  }) => void;
};
