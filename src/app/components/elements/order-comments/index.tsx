'use client';

import AddComment from '@/app/containers/elements/add-comment';
import Label from '@/app/components/elements/label';

import { OrderCommentsProps } from './types';
import styles from './styles.module.scss';

export default function OrderComments({
  COMMENT_SALON,
  COMMENT_WORKER,
  isSalon,
  isBuilder,
}: OrderCommentsProps) {
  const getCommentsByType = (comments: string[]) => {
    if (comments.length > 0) {
      return comments.map((comment: string, index: number) => (
        <div className={styles.comment} key={index}>
          {comment}
        </div>
      ));
    }

    return <p>Пока ничего нет</p>;
  };

  return (
    <div className={styles.comments}>
      <div className={styles.item}>
        <Label>Комментарий салона</Label>
        {getCommentsByType(COMMENT_SALON)}
        {isSalon && COMMENT_SALON.length <= 14 && <AddComment />}
      </div>

      <div className={styles.item}>
        <Label>Комментарий сборщика</Label>
        {getCommentsByType(COMMENT_WORKER)}
        {isBuilder && COMMENT_WORKER.length <= 14 && <AddComment />}
      </div>
    </div>
  );
}
