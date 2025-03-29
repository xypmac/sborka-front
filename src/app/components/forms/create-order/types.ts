export type CreateOrderProps = {
  onCreateOrder: (data: any) => void;
  isSalon: boolean;
};

export type Fields = {
  address: string;
  price: string;
  name: string;
  phone: string;
  comment?: string;
};
