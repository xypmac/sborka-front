export type InputProps = {
  name: string;
  id: string;
  error: string;
  type: 'text';
  placeholder?: string;
  onFocus: (field: string) => void;
  onChange: (value: string, field: string) => void;
};
