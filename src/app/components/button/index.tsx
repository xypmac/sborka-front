'use client';

import cn from 'classnames';

import styles from './styles.module.scss';

import { ButtonProps } from './types';

export default function Button({
  text,
  type,
  isDisabled = false,
  onClick,
}: ButtonProps) {
  const onClickHandler = () => {
    onClick && onClick();
  };

  return (
    <button
      className={cn(styles.button, isDisabled && styles.disabled)}
      type={type}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
