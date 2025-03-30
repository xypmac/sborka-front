'use client';

import { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { HOST } from '@/app/utils/constants';

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
  onRemoveFile,
}: OrderFilesProps) {
  const [isShowImage, setIsShowImage] = useState(false);
  const [imageFull, setImageFull] = useState('');
  const photoRoom = useRef<HTMLInputElement | null>(null);
  const photoReport = useRef<HTMLInputElement | null>(null);
  const sketch = useRef<HTMLInputElement | null>(null);
  const measuring = useRef<HTMLInputElement | null>(null);

  const onHideImageHandler = () => {
    setImageFull('');
    setIsShowImage(false);
  };

  return (
    <div className={styles.files}>
      {isShowImage && (
        <div className={styles.full} onClick={onHideImageHandler}>
          <div className={styles.bg} />
          <div className={styles.imageWrap}>
            <img src={imageFull} />
          </div>
        </div>
      )}

      <div className={styles.item}>
        <p className={styles.label}>Фото помещения</p>
        <div className={styles.images}>
          {PHOTO_ROOM.length > 0 &&
            PHOTO_ROOM.map(({ id, path }: { id: number; path: string }) => (
              <div key={id}>
                <img
                  src={`${HOST}${path}`}
                  className={styles.image}
                  onClick={() => {
                    setImageFull(`${HOST}${path}`);
                    setIsShowImage(true);
                  }}
                />
                <p
                  className={styles.remove}
                  onClick={() => onRemoveFile({ id, type: 'PHOTO_ROOM' })}
                >
                  Удалить
                </p>
              </div>
            ))}
          {!isBuilder && (
            <>
              <div
                className={styles.add}
                onClick={() => photoRoom.current && photoRoom.current.click()}
              >
                <FaPlus size={20} />
              </div>
              <input
                accept='image/png, image/jpeg'
                size={10809064}
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
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Замер</p>
        <div className={styles.images}>
          {MEASURING.length > 0 &&
            MEASURING.map(({ id, path }: { id: number; path: string }) => (
              <div key={id}>
                <img
                  src={`${HOST}${path}`}
                  className={styles.image}
                  onClick={() => {
                    setImageFull(`${HOST}${path}`);
                    setIsShowImage(true);
                  }}
                />
                <p
                  className={styles.remove}
                  onClick={() => onRemoveFile({ id, type: 'MEASURING' })}
                >
                  Удалить
                </p>
              </div>
            ))}
          {!isBuilder && (
            <>
              <div
                className={styles.add}
                onClick={() => measuring.current && measuring.current.click()}
              >
                <FaPlus size={20} />
              </div>
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
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Эскиз</p>
        <div className={styles.images}>
          {SKETCH.length > 0 &&
            SKETCH.map(({ id, path }: { id: number; path: string }) => (
              <div key={id}>
                <img
                  src={`${HOST}${path}`}
                  className={styles.image}
                  onClick={() => {
                    setImageFull(`${HOST}${path}`);
                    setIsShowImage(true);
                  }}
                />
                <p
                  className={styles.remove}
                  onClick={() => onRemoveFile({ id, type: 'SKETCH' })}
                >
                  Удалить
                </p>
              </div>
            ))}
          {!isBuilder && (
            <>
              <div
                className={styles.add}
                onClick={() => sketch.current && sketch.current.click()}
              >
                <FaPlus size={20} />
              </div>
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
      </div>
      {!isMasurer && (
        <div className={styles.item}>
          <p className={styles.label}>Фотоотчет сборки</p>
          <div className={styles.images}>
            {PHOTO_REPORT.length > 0 &&
              PHOTO_REPORT.map(({ id, path }: { id: number; path: string }) => (
                <div key={id}>
                  <img
                    src={`${HOST}/${path}`}
                    className={styles.image}
                    onClick={() => {
                      setImageFull(`${HOST}${path}`);
                      setIsShowImage(true);
                    }}
                  />
                  <p
                    className={styles.remove}
                    onClick={() => onRemoveFile({ id, type: 'PHOTO_REPORT' })}
                  >
                    Удалить
                  </p>
                </div>
              ))}
            {!isSalon && (
              <>
                <div
                  className={styles.add}
                  onClick={() =>
                    photoReport.current && photoReport.current.click()
                  }
                >
                  <FaPlus size={20} />
                </div>
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
        </div>
      )}
    </div>
  );
}
