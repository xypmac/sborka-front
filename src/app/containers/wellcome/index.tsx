'use client';

import { useState } from 'react';

import { AUTHORIZATION_MODE } from '@/app/constants';
import WellcomeForm from '@/app/containers/wellcome-form';

import styles from './styles.module.scss';

export default function Wellcome() {
  const [mode, setMode] = useState(AUTHORIZATION_MODE.LOGIN);

  const isLoginMode = mode === AUTHORIZATION_MODE.LOGIN;
  const heading = isLoginMode ? 'С возвращением!' : 'Добро пожаловать!';
  const subheading = isLoginMode
    ? 'Укажите вашу почту и пароль'
    : 'Создайте аккаунт';
  const action = isLoginMode ? 'Нет аккаунта' : 'Есть аккаунт';

  const onClickHandler = () => {
    if (isLoginMode) {
      setMode(AUTHORIZATION_MODE.REGISTRATION);
    } else {
      setMode(AUTHORIZATION_MODE.LOGIN);
    }
  };

  return (
    <div className={styles.wellcome}>
      <div className={styles.block}>
        <p className={styles.heading}>{heading}</p>
        <p className={styles.subheading}>{subheading}</p>
        <WellcomeForm isLoginMode={isLoginMode} />
        <span className={styles.action} onClick={onClickHandler}>
          {action}
        </span>
      </div>
    </div>
  );
}
