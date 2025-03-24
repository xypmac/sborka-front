'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/store';
import { exit } from '@/app/store/session';
import { PAGES } from '@/app/utils/constants';

import { menu } from './data';
import { MenuProps } from './types';
import styles from './styles.module.scss';

export default function Menu({ isAdmin, isTaskmaster }: MenuProps) {
  const [pathname, setPathname] = useState('');

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className={styles.menu}>
      <ul className={styles.list}>
        {menu.map((elem) => {
          const isActive = pathname !== '' && pathname === elem.link;

          if (elem.link === PAGES.USERS && !isAdmin && !isTaskmaster) {
            return null;
          }

          return (
            <li
              className={cn(styles.elem, isActive && styles.active)}
              key={elem.id}
            >
              <Link href={elem.link}>{elem.name}</Link>
            </li>
          );
        })}
      </ul>

      <p className={styles.action} onClick={() => dispatch(exit())}>
        Выйти из профиля
      </p>
    </div>
  );
}
