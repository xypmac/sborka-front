'use client';

import { FaPlus } from 'react-icons/fa6';

import Flex from '@/app/components/elements/flex';

import { ImagesProps } from './types';
import styles from './styles.module.scss';

export default function Images({ list, onAdd }: ImagesProps) {
  return (
    <Flex gap={10} justify='flex-start'>
      {list.length > 0 &&
        list.map((photo: string, index: number) => {
          return <img className={styles.image} key={index} src={photo} />;
        })}
      <div className={styles.add} onClick={onAdd}>
        <FaPlus size={20} />
      </div>
    </Flex>
  );
}
