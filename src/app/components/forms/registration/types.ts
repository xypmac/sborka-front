export type RegistrationProps = {
  serverError: string | null;
};

export type Fields = {
  login: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phone: string;
  type: string;
  partner?: string;
  address?: string;
  fio?: string;
};

export type FildsNames =
  | 'login'
  | 'password'
  | 'passwordConfirm'
  | 'type'
  | 'phone'
  | 'email'
  | 'partner'
  | 'address'
  | 'fio';
