export type CalendarUser = {
  id: number;
  name: string;
  group: string;
  day: string;
};

export type CalendarType = {
  users: CalendarUser[] | [];
  orders: any;
  usersTotal: number;
  ordersTotal: number;
  wait: boolean;
  waitOrders: boolean;
  currentPage: number;
  currentPageOrders: number;
  error: string | null;
  errorOrder: string | null;
  sort: {
    name: string;
    dir: 'DESC' | 'ASC';
  };
  filter: {
    date: string;
    name?: string;
    group?: string;
    status?: string;
  };
  filterOrders: {
    search?: string;
    status?: string;
    dateTo?: string;
    dateFrom?: string;
    searchType?: string;
  };
};
