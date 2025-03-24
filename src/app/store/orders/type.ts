export type Order = {
  ORDER_ID: number;
  FIO: string;
  PHONE_CLIENT: string;
  ADDRESS: string;
  STATUS: string;
  PRICE_APP?: string;
  PHOTO_ROOM: {
    id: number;
    path: string;
  }[];
  PHOTO_REPORT: {
    id: number;
    path: string;
  }[];
  MEASURING: {
    id: number;
    path: string;
  }[];
  SKETCH: {
    id: number;
    path: string;
  }[];
  COMMENT_SALON?: string[];
  COMMENT_WORKER?: string[];
  PRICE?: string;
  DATE_WORK?: string;
  DATE_END_WORK?: string;
  DATE_CANCEL_WORK?: string;
};

export type OrdersType = {
  list: Order[] | [];
  total: number;
  currentPage: number;
  currentOrder: Order | null;
  error: string | null;
  isWait: boolean;
  filter: {
    id: string;
    name: string;
    status: string;
    date: string;
  };
};
