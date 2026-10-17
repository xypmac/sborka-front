import { Order } from '@/app/store/orders/types';

export type ListProps = {
  orders: Order[];
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
};
