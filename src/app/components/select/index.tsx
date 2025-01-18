'use client';

import { useState } from 'react';
import cn from 'classnames';

import { types } from './data';
import { SelectProps } from './types';
import styles from './styles.module.scss';

export default function Select({ onSelect }: SelectProps) {
  const [isShow, setIsShow] = useState(false);
  const [activeElem, setActiveElem] = useState('');

  const onShowHadler = () => {
    setIsShow(true);
  };

  const onSelectHandler = (title: string, type: number) => {
    setActiveElem(title);
    onSelect(type);
    setIsShow(false);
  };

  return (
    <div className={styles.select}>
      <p
        className={cn(
          styles.active,
          isShow && styles.show,
          activeElem !== '' && styles.color
        )}
        onClick={onShowHadler}
      >
        {activeElem === '' ? 'Тип пользователя' : activeElem}
      </p>

      {isShow && (
        <ul className={styles.list}>
          {types.map((type) => {
            return (
              <li
                key={type.id}
                value='2'
                className={cn(
                  styles.elem,
                  activeElem === type.title && styles.activeElem
                )}
                onClick={() => onSelectHandler(type.title, type.id)}
              >
                {type.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
