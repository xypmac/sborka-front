import { Filter } from '@/app/store/users/types';

export type FilterProps = {
  isAllowCreateUser: boolean;
  onSearch: (params: Filter) => void;
};
