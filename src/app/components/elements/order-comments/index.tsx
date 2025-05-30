'use client';

import AddComment from '@/app/containers/elements/add-comment';
import Label from '@/app/components/elements/label';
import Flex from '@/app/components/elements/flex';

import { OrderCommentsProps } from './types';
import styles from './styles.module.scss';

export default function OrderComments({
  COMMENT_SALON,
  COMMENT_WORKER,
  isSalon,
  isTaskmaster,
  isAdmin,
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
    <Flex gap={20} direction='column' width={468}>
      <Flex gap={4} direction='column'>
        <Label>Комментарий салона</Label>
        {getCommentsByType(COMMENT_SALON)}
        {isSalon && COMMENT_SALON.length <= 14 && <AddComment />}
      </Flex>

      {!isSalon && (
        <Flex gap={4} direction='column'>
          <Label>Комментарий бригадира</Label>
          {getCommentsByType(COMMENT_WORKER)}
          {(isTaskmaster || isAdmin) && COMMENT_WORKER.length <= 14 && (
            <AddComment />
          )}
        </Flex>
      )}
    </Flex>
  );
}
