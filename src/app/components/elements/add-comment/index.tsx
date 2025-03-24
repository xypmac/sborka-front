'use client';

import { useState } from 'react';

import Button from '@/app/components/elements/button';

import { AddCommentProps } from './types';
import styles from './styles.module.scss';

export default function AddComment({ onAddComment, ID }: AddCommentProps) {
  const [comment, setComment] = useState('');

  return (
    <div className={styles.comment}>
      <input
        className={styles.input}
        placeholder='Введите комментарий'
        id='comment'
        name='comment'
        onChange={(e) => setComment(e.target.value)}
        type='text'
        value={comment}
      />
      <Button
        isDisabled={comment === ''}
        type='button'
        onClick={() => {
          onAddComment({ ID, comment });
          setComment('');
        }}
        text='Добавить комментарий'
      />
    </div>
  );
}
