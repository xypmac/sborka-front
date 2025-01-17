import styles from './styles.module.scss';

import { ButtonProps } from './types';

export default function Button({ text, onClick, type }: ButtonProps) {
  const onClickHandler = () => {
    onClick && onClick();
  };

  return (
    <button className={styles.button} type={type} onClick={onClickHandler}>
      {text}
    </button>
  );
}
