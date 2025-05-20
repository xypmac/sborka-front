import { Order } from '@/app/store/orders/types';
import { User } from '@/app/store/users/types';

export type OrderProps = {
  order: Pick<
    Order,
    | 'ORDER_ID'
    | 'PRICE_APP'
    | 'PRICE'
    | 'STATUS'
    | 'FIO'
    | 'ADDRESS'
    | 'COMMENT_SALON'
    | 'COMMENT_WORKER'
    | 'PHONE_CLIENT'
    | 'PHOTO_REPORT'
    | 'DATE_WORK'
    | 'DATE_END_WORK'
    | 'DATE_CANCEL_WORK'
    | 'PHOTO_ROOM'
    | 'SALON'
    | 'MEASURER'
    | 'WORKER'
  >;
  users: User[];
  serverError?: string | null;
  isWait?: boolean;
  isAdmin: boolean;
  isTaskmaster: boolean;
  isMasurer: boolean;
  isBuilder: boolean;
  isSalon: boolean;
  onShowModal: (id: string) => void;
  onUpdateOrder: (data: any) => void;
};

export type Fields = Pick<
  Order,
  | 'PRICE_APP'
  | 'ADDRESS'
  | 'PRICE'
  | 'STATUS'
  | 'FIO'
  | 'PHONE_CLIENT'
  | 'DATE_WORK'
  | 'DATE_END_WORK'
  | 'DATE_CANCEL_WORK'
>;
