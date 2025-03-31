export type CreateOrderProps = {
  onCreateOrder: (data: any) => void;
  error: string;
  isWait: boolean;
  isSalon: boolean;
};

export type Fields = {
  address: string;
  price: string;
  name: string;
  phone: string;
  roomPhotos: string[];
  sketchPhotos: string[];
  sizePhotos: string[];
  comment?: string;
};
