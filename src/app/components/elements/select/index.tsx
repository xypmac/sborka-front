'use client';

import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import useClickOutside from '@/app/hooks/use-click-outside';
import Error from '@/app/components/elements/error';

import { SelectProps, Option } from './types';
import styles from './styles.module.scss';

export default function Select({
  value = '',
  defaultOption,
  options,
  onSelect,
  error,
  isDisable,
}: SelectProps) {
  const [isShow, setIsShow] = useState(false);
  const [activeElem, setActiveElem] = useState(value);

  const listRef = useRef<HTMLUListElement | null>(null);

  useClickOutside(listRef, () => {
    setIsShow(false);
  });

  useEffect(() => {
    setActiveElem(value);
  }, [value]);

  const onSelectHandler = (title: string, value: string) => {
    setIsShow(false);
    setActiveElem(title);
    onSelect(value, 'type');
  };

  const getOptions = () => {
    return options.map((type: Option) => {
      return (
        <li
          key={type.id}
          className={cn(
            styles.elem,
            activeElem === type.title && styles.activeElem
          )}
          onClick={() => onSelectHandler(type.title, String(type.id))}
        >
          {type.title}
        </li>
      );
    });
  };

  return (
    <div className={cn(styles.select, isDisable && styles.disable)}>
      <div
        className={cn(
          styles.active,
          isShow && styles.show,
          activeElem !== '' && !isDisable && styles.color,
          error && styles.selectError,
          isDisable && styles.disable
        )}
        onClick={() => setIsShow(true)}
      >
        {activeElem === '' ? defaultOption : activeElem}
      </div>

      {isShow && (
        <ul className={styles.list} ref={listRef}>
          {getOptions()}
        </ul>
      )}

      {error && <Error error={error} />}
    </div>
  );
}
