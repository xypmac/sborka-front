import { Filter } from '@/app/store/orders/types';

export type FilterProps = {
  isAllowCreateOrder: boolean;
  onSearch: (params: Filter) => void;
};
