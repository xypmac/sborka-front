import { ChangeEvent } from 'react';

export type InputSimpleProps = {
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
