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
    dateFrom,
    dateTo,
    searchType,
  }: {
    search?: string;
    status?: string;
    dateTo?: string;
    dateFrom?: string;
    searchType?: string;
  }) => void;
  onLoad: () => void;
};
