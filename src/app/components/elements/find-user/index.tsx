'use client';

import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import Label from '@/app/components/elements/label';
import { FaArrowAltCircleRight, FaRegTimesCircle } from 'react-icons/fa';

import useClickOutside from '@/app/hooks/use-click-outside';

import { FindUserProps } from './types';
import styles from './styles.module.scss';
import { User } from '@/app/store/users/type';

export default function FindUser({
  user,
  users,
  onChoose,
  onShowModal,
  onClear,
  label,
  isSalon,
  isDisabled,
  placeholder,
}: FindUserProps) {
  const initialUsers = users;
  const [value, setValue] = useState(
    isSalon ? user?.WORK_COMPANY || '' : user?.NAME || ''
  );
  const [options, setOptions] = useState(users);
  const [isShowOptions, setIsOptions] = useState(false);

  const optionsRef = useRef(null);

  useEffect(() => {
    setValue(isSalon ? user?.WORK_COMPANY || '' : user?.NAME || '');
  }, [user]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isShowOptions) {
        if (value === '') {
          setOptions(initialUsers);
          setValue('');
        } else {
          if (isSalon) {
            setOptions(
              initialUsers.filter((option: User) =>
                (option.WORK_COMPANY || '')
                  .toLowerCase()
                  .includes(value.toLowerCase())
              )
            );
          } else {
            setOptions(
              initialUsers.filter((option: User) =>
                (option.NAME || '').toLowerCase().includes(value.toLowerCase())
              )
            );
          }
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [value, 500]);

  useClickOutside(optionsRef, () => {
    setIsOptions(false);
  });

  const onChooseHandler = (e: any, option: User) => {
    e.stopPropagation();
    onChoose(option);
    setValue(option[isSalon ? 'WORK_COMPANY' : 'NAME'] || '');
    setIsOptions(false);
    setOptions(initialUsers);
  };

  return (
    <div className={styles.item}>
      <Label>{label}</Label>
      <div className={styles.control}>
        <input
          autoComplete='off'
          className={styles.input}
          onClick={() => setIsOptions(true)}
          placeholder={placeholder}
          disabled={isDisabled}
          id='value'
          name='value'
          onChange={(e) => setValue(e.target.value)}
          type='text'
          value={value}
          onSelect={(e) => e.preventDefault()}
        />

        {isShowOptions && (
          <div className={styles.options} ref={optionsRef}>
            {options.length > 0 ? (
              options.map((option: User) => (
                <div
                  className={cn(styles.option, styles.available)}
                  key={option.ID}
                  onClick={(e) => onChooseHandler(e, option)}
                >
                  {option[isSalon ? 'WORK_COMPANY' : 'NAME'] || ''}
                </div>
              ))
            ) : (
              <div className={styles.option}>Ничего не найдено</div>
            )}
          </div>
        )}

        {!isDisabled && user && (
          <>
            <p className={styles.action} onClick={() => onShowModal(user.ID)}>
              <FaArrowAltCircleRight />
              {user.LOGIN}
            </p>
            <FaRegTimesCircle onClick={onClear} style={{ cursor: 'pointer' }} />
          </>
        )}
      </div>
    </div>
  );
}
