import { Order } from '@/app/store/orders/type';

export type OrdersProps = {
  isWait: boolean;
  currentPage: number;
  error: null | string;
  orders: Order[];
  total: number;
  onSearch: ({
    search,
    status,
    sort,
    dir,
    dateFrom,
    dateTo,
    searchType,
  }: {
    sort?: string;
    dir?: string;
    search?: string;
    status?: string;
    dateTo?: string;
    dateFrom?: string;
    searchType?: string;
  }) => void;
  onLoad: () => void;
};
