'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import Loader from '@/app/components/loader';
import { RootState } from '@/app/store';
import { AUTHORIZATION_MODE } from '@/app/constants';

import Login from './login';
import Registration from './registration';
import styles from './styles.module.scss';

export default function Wellcome() {
  const { wait } = useSelector((state: RootState) => ({
    wait: state.session.wait,
  }));

  const [mode, setMode] = useState(AUTHORIZATION_MODE.LOGIN);

  const isLoginMode = mode === AUTHORIZATION_MODE.LOGIN;
  const action = isLoginMode ? 'Нет аккаунта' : 'Есть аккаунт';

  const onChangeModeHandler = () => {
    if (isLoginMode) {
      setMode(AUTHORIZATION_MODE.REGISTRATION);
    } else {
      setMode(AUTHORIZATION_MODE.LOGIN);
    }
  };

  return (
    <div className={styles.wellcome}>
      <div className={styles.block}>
        {wait && <Loader />}
        {isLoginMode ? <Login /> : <Registration />}
        <span className={styles.action} onClick={onChangeModeHandler}>
          {action}
        </span>
      </div>
    </div>
  );
}
