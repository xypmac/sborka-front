export type CreateOrderProps = {
  onCreateOrder: (data: Fields) => void;
  error: string;
  isWait: boolean;
  isSalon: boolean;
};

export type Fields = {
  id: string;
  address: string;
  price: string;
  name: string;
  phone: string;
  sketchPhotos: string[];
  roomPhotos?: string[];
  sizePhotos?: string[];
  comment?: string;
};

export type FieldsName =
  | 'id'
  | 'price'
  | 'name'
  | 'phone'
  | 'comment'
  | 'address'
  | 'roomPhotos'
  | 'sketchPhotos'
  | 'sizePhotos';
