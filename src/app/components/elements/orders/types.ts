export type UsersProps = {
  isAllowCreateOrder: boolean;
  orders: any[];
  total: number;
  isWait: boolean;
  loadMore: () => void;
};
