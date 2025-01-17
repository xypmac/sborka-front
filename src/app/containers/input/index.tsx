import { useState } from 'react';

import styles from './styles.module.scss';

import { InputProps } from './types';

export default function Input({
  id,
  name,
  error,
  type,
  placeholder,
  onFocus,
  onChange,
}: InputProps) {
  const [value, setValue] = useState('');

  const onChangeHandler = (e: any) => {
    onChange(e.target.value, name);
    setValue(e.target.value);
  };

  const onFocusHandler = (e: any) => {
    onFocus(name);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        name={name}
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
      />
      {error !== '' && <p className={styles.error}>{error}</p>}
    </div>
  );
}
