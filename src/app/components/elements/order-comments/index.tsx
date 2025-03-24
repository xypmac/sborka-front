'use client';

import AddComment from '@/app/containers/elements/add-comment';

import { OrderCommentsProps } from './types';
import styles from './styles.module.scss';

export default function OrderComments({
  COMMENT_SALON,
  COMMENT_WORKER,
  isSalon,
  isBuilder,
}: OrderCommentsProps) {
  return (
    <div className={styles.comments}>
      <div className={styles.item}>
        <p className={styles.label}>Комментарий салона</p>
        {COMMENT_SALON.length > 0 ? (
          COMMENT_SALON.map((comment: string, index: number) => (
            <div className={styles.comment} key={index}>
              {comment}
            </div>
          ))
        ) : (
          <p>Пока ничего нет</p>
        )}
        {isSalon && COMMENT_SALON.length <= 14 && <AddComment isSalon />}
      </div>

      <div className={styles.item}>
        <p className={styles.label}>Комментарий сборщика</p>
        {COMMENT_WORKER.length > 0 ? (
          COMMENT_WORKER.map((comment: string, index: number) => (
            <div className={styles.comment} key={index}>
              {comment}
            </div>
          ))
        ) : (
          <p>Пока ничего нет</p>
        )}
        {isBuilder && COMMENT_WORKER.length <= 14 && <AddComment />}
      </div>
    </div>
  );
}
