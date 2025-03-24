export type ButtonProps = {
  text: string;
  type: 'button' | 'reset' | 'submit';
  isDisabled?: boolean;
  onClick?: () => void;
};
