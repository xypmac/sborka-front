import cn from 'classnames';

import { ButtonProps } from './types';
import styles from './styles.module.scss';

export default function Button({
  children,
  isDisabled = false,
  type = 'button',
  onClick,
}: ButtonProps) {
  const onClickHandler = () => onClick && onClick();

  return (
    <button
      className={cn(styles.button, isDisabled && styles.disabled)}
      type={type}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
