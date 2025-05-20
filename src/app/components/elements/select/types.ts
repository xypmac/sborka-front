import { UseFormRegister } from 'react-hook-form';

export type Option = {
  id: number;
  title: string;
};

export type SelectProps = {
  onSelect: (value: string, field: 'type') => void;
  error: string | null;
  defaultOption: string;
  options: Option[];
  value?: string;
  isDisable?: boolean;
  width?: number;
};
