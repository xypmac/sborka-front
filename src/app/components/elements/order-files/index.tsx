'use client';

import { useRef } from 'react';

import Button from '@/app/components/elements/button';

import { OrderFilesProps } from './types';
import styles from './styles.module.scss';

export default function OrderFiles({
  PHOTO_ROOM,
  PHOTO_REPORT,
  SKETCH,
  MEASURING,
  isBuilder,
  isMasurer,
  isSalon,
  onAddFile,
}: OrderFilesProps) {
  const photoRoom = useRef<HTMLInputElement | null>(null);
  const photoReport = useRef<HTMLInputElement | null>(null);
  const sketch = useRef<HTMLInputElement | null>(null);
  const measuring = useRef<HTMLInputElement | null>(null);

  return (
    <div className={styles.files}>
      <div className={styles.item}>
        <p className={styles.label}>Фото помещения</p>
        <div className={styles.images}>
          {PHOTO_ROOM.length > 0 ? (
            PHOTO_ROOM.map(({ id, path }: { id: number; path: string }) => (
              <img
                key={id}
                src={`https://sborkatestqwety.ru/${path}`}
                className={styles.image}
              />
            ))
          ) : (
            <p>Пока ничего нет</p>
          )}
        </div>
        {!isBuilder && (
          <>
            <Button
              type='button'
              text='Добавить изображение'
              onClick={() => photoRoom.current && photoRoom.current.click()}
            />
            <input
              accept='image/png, image/jpeg'
              ref={photoRoom}
              type='file'
              onChange={(e: any) => {
                const file = e.target.files[0];
                onAddFile({ file, type: 'PHOTO_ROOM' });
              }}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Замер</p>
        <div className={styles.images}>
          {MEASURING.length > 0 ? (
            MEASURING.map(({ id, path }: { id: number; path: string }) => (
              <img
                key={id}
                src={`https://sborkatestqwety.ru/${path}`}
                className={styles.image}
              />
            ))
          ) : (
            <p>Пока ничего нет</p>
          )}
        </div>
        {!isBuilder && (
          <>
            <Button
              type='button'
              text='Добавить изображение'
              onClick={() => measuring.current && measuring.current.click()}
            />
            <input
              accept='image/png, image/jpeg'
              ref={measuring}
              type='file'
              onChange={(e: any) => {
                const file = e.target.files[0];
                onAddFile({ file, type: 'MEASURING' });
              }}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Эскиз</p>
        <div className={styles.images}>
          {SKETCH.length > 0 ? (
            SKETCH.map(({ id, path }: { id: number; path: string }) => (
              <img
                key={id}
                src={`https://sborkatestqwety.ru/${path}`}
                className={styles.image}
              />
            ))
          ) : (
            <p>Пока ничего нет</p>
          )}
        </div>
        {!isBuilder && !isMasurer && (
          <>
            <Button
              type='button'
              text='Добавить изображение'
              onClick={() => sketch.current && sketch.current.click()}
            />
            <input
              accept='image/png, image/jpeg'
              ref={sketch}
              type='file'
              onChange={(e: any) => {
                const file = e.target.files[0];
                onAddFile({ file, type: 'SKETCH' });
              }}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
      {!isMasurer && (
        <div className={styles.item}>
          <p className={styles.label}>Фотоотчет сборки</p>
          <div className={styles.images}>
            {PHOTO_REPORT.length > 0 ? (
              PHOTO_REPORT.map(({ id, path }: { id: number; path: string }) => (
                <img
                  key={id}
                  src={`https://sborkatestqwety.ru/${path}`}
                  className={styles.image}
                />
              ))
            ) : (
              <p>Пока ничего нет</p>
            )}
          </div>
          {!isSalon && (
            <>
              <Button
                type='button'
                text='Добавить изображение'
                onClick={() =>
                  photoReport.current && photoReport.current.click()
                }
              />
              <input
                accept='image/png, image/jpeg'
                ref={photoReport}
                type='file'
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  onAddFile({ file, type: 'PHOTO_REPORT' });
                }}
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
