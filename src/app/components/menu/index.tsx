'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { menu } from './data';
import styles from './styles.module.scss';

export default function Menu() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className={styles.menu}>
      <ul className={styles.list}>
        {menu.map((elem) => {
          const isActive = pathname !== '' && pathname === elem.link;

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
    </div>
  );
}
