export type ButtonProps = {
  children: string;
  type?: 'button' | 'reset' | 'submit';
  isDisabled?: boolean;
  onClick?: () => void;
};
