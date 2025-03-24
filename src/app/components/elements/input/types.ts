import { UseFormRegister } from 'react-hook-form';

export type InputProps = {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  error: string | null;
  onChange: (value: string, field: any) => void;
  isDisable?: boolean;
  type?: string;
};
