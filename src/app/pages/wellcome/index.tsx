'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Loader from '@/app/components/elements/loader';
import Login from '@/app/components/forms/login';
import Registration from '@/app/components/forms/registration';
import { AppDispatch, RootState } from '@/app/store';
import { WELCOME_MODE } from '@/app/utils/constants';
import { clearError } from '@/app/store/session';
import { login } from '@/app/store/session/thunks';

import styles from './styles.module.scss';

export default function Wellcome() {
  const { wait, registrationError, serverError } = useSelector(
    (state: RootState) => ({
      wait: state.session.wait,
      registrationError: state.session.registrationError,
      serverError: state.session.error,
    })
  );

  const [mode, setMode] = useState(WELCOME_MODE.LOGIN);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [pendingCredentials, setPendingCredentials] = useState<{ login: string; password: string } | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const isLoginMode = mode === WELCOME_MODE.LOGIN;

  const onChangeModeHandler = () => {
    setMode(isLoginMode ? WELCOME_MODE.REGISTRATION : WELCOME_MODE.LOGIN);
    dispatch(clearError());
  };

  const onRegistrationSuccess = (userLogin: string, password: string) => {
    setPendingCredentials({ login: userLogin, password });
    setRegistrationSuccess(true);
  };

  useEffect(() => {
    if (!registrationSuccess || !pendingCredentials) return;
    const timer = setTimeout(() => {
      dispatch(login(pendingCredentials));
    }, 2000);
    return () => clearTimeout(timer);
  }, [registrationSuccess]);

  return (
    <div className={styles.wellcome}>
      <div className={styles.wrap}>
        <div className={styles.block}>
          {wait && <Loader />}
          {registrationSuccess ? (
            <p>Регистрация прошла успешно! Выполняется вход...</p>
          ) : isLoginMode ? (
            <Login error={serverError} />
          ) : (
            <Registration serverError={registrationError} onSuccess={onRegistrationSuccess} />
          )}
          {!registrationSuccess && (
            <span className={styles.action} onClick={onChangeModeHandler}>
              {isLoginMode ? 'Регистрация' : 'Есть аккаунт'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
