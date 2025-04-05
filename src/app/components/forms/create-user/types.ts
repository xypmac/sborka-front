export type CreateUserProps = {
  onCreateUser: (data: Fields) => void;
  error: string;
  isWait: boolean;
};

export type Fields = {
  login: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phone: string;
  type: string;
  fio?: string;
  partner?: string;
  address?: string;
};

export type FieldsName =
  | 'login'
  | 'password'
  | 'passwordConfirm'
  | 'type'
  | 'phone'
  | 'email'
  | 'fio'
  | 'partner'
  | 'address';
