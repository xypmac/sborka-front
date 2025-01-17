export type ButtonProps = {
  text: string;
  type: 'button' | 'reset' | 'submit';
  onClick?: () => void;
};
