'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import cn from 'classnames';

import Error from '@/app/components/elements/error';
import Flex from '@/app/components/elements/flex';
import Label from '@/app/components/elements/label';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import { AppDispatch } from '@/app/store';
import getPhoneFormat from '@/app/utils/get-phone-number';

import schema from './schema';
import { CreateOrderProps, Fields } from './types';
import styles from './styles.module.scss';

export default function CreateOrder({
  onCreateOrder,
  isSalon,
  isWait,
  error,
}: CreateOrderProps) {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      roomPhotos: [],
      sketchPhotos: [],
      sizePhotos: [],
      address: '',
      price: '',
      name: '',
      phone: '',
      comment: '',
    },
    resolver: yupResolver(schema),
  });

  const roomRef = useRef<HTMLInputElement | null>(null);
  const sketchRef = useRef<HTMLInputElement | null>(null);
  const sizeRef = useRef<HTMLInputElement | null>(null);

  const [roomPhotos, setRoomPhotos] = useState<File[]>([]);
  const [sketchPhotos, setSketchPhotos] = useState<File[]>([]);
  const [sizePhotos, setSizePhotos] = useState<File[]>([]);

  const [roomPhotosPreview, setRoomPhotosPreview] = useState<string[]>([]);
  const [sketchPhotosPreview, setSketchPhotosPreview] = useState<string[]>([]);
  const [sizePhotosPreview, setSizePhotosPreview] = useState<string[]>([]);

  const onSubmitHandler = (data: any) => {
    onCreateOrder({ ...data, roomPhotos, sketchPhotos, sizePhotos });
  };

  return (
    <form
      className={cn(styles.form, isWait && styles.wait)}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <p className={styles.caption}>Создать заказ</p>

      <Flex gap={20} margin='20px 0' direction='column'>
        <Flex gap={4} direction='column'>
          <Label>Стоимость</Label>
          <Input
            name='price'
            placeholder='Стоимость'
            register={register}
            error={errors.price?.message || null}
            onChange={(value) => {
              setValue('price', value.replace(/\D/, ''), {
                shouldValidate: true,
              });
            }}
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>ФИО клиента</Label>
          <Input
            name='name'
            placeholder='ФИО клиета'
            register={register}
            error={errors.name?.message || null}
            onChange={(value) =>
              setValue('name', value, {
                shouldValidate: true,
              })
            }
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Номер клиента</Label>
          <Input
            name='phone'
            placeholder='Номер клиента'
            register={register}
            error={errors.phone?.message || null}
            onChange={(value) =>
              setValue('phone', getPhoneFormat(value), {
                shouldValidate: true,
              })
            }
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Адрес клиента</Label>
          <Input
            name='address'
            placeholder='Адрес клиента'
            register={register}
            error={errors.address?.message || null}
            onChange={(value) =>
              setValue('address', value, {
                shouldValidate: true,
              })
            }
          />
        </Flex>

        {isSalon && (
          <Flex gap={4} direction='column'>
            <Label>Комментарий</Label>
            <Input
              name='comment'
              placeholder='Комментарий'
              register={register}
              error={errors.comment?.message || null}
              onChange={(e) => false}
            />
          </Flex>
        )}

        <Flex gap={4} direction='column'>
          <Label>Фото помещения</Label>
          <Flex gap={10} justify='flex-start'>
            {getValues().roomPhotos.length > 0 &&
              getValues().roomPhotos.map((photo, index) => {
                return <img className={styles.image} key={index} src={photo} />;
              })}
            <div
              className={styles.add}
              onClick={() => roomRef.current && roomRef.current.click()}
            >
              <FaPlus size={20} />
            </div>
          </Flex>
          {errors.roomPhotos && (
            <Error error={errors.roomPhotos.message || ''} />
          )}
          <input
            accept='image/png, image/jpeg'
            ref={roomRef}
            type='file'
            onChange={(e: any) => {
              const file = e.target.files[0];
              if (file) {
                setRoomPhotos([...roomPhotos, file]);
                clearErrors('roomPhotos');
                const reader = new FileReader();

                reader.onloadend = () => {
                  setValue('roomPhotos', [
                    ...getValues().roomPhotos,
                    reader.result as string,
                  ]);
                  setRoomPhotosPreview([
                    ...roomPhotosPreview,
                    reader.result as string,
                  ]);
                };

                reader.readAsDataURL(file);
              }
            }}
            style={{ display: 'none' }}
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Эскиз</Label>
          <Flex gap={10} justify='flex-start'>
            {getValues().sketchPhotos.length > 0 &&
              getValues().sketchPhotos.map((photo, index) => {
                return <img className={styles.image} key={index} src={photo} />;
              })}
            <div
              className={styles.add}
              onClick={() => sketchRef.current && sketchRef.current.click()}
            >
              <FaPlus size={20} />
            </div>
          </Flex>
          {errors.sketchPhotos && (
            <Error error={errors.sketchPhotos.message || ''} />
          )}
          <input
            accept='image/png, image/jpeg'
            ref={sketchRef}
            type='file'
            onChange={(e: any) => {
              const file = e.target.files[0];
              if (file) {
                setSketchPhotos([...sketchPhotos, file]);
                clearErrors('sketchPhotos');
                const reader = new FileReader();

                reader.onloadend = () => {
                  setValue('sketchPhotos', [
                    ...getValues().sketchPhotos,
                    reader.result as string,
                  ]);
                  setSketchPhotosPreview([
                    ...sketchPhotosPreview,
                    reader.result as string,
                  ]);
                };

                reader.readAsDataURL(file);
              }
            }}
            style={{ display: 'none' }}
          />
        </Flex>

        <Flex gap={4} direction='column'>
          <Label>Эскиз</Label>
          <Flex gap={10} justify='flex-start'>
            {getValues().sizePhotos.length > 0 &&
              getValues().sizePhotos.map((photo, index) => {
                return <img className={styles.image} key={index} src={photo} />;
              })}
            <div
              className={styles.add}
              onClick={() => sizeRef.current && sizeRef.current.click()}
            >
              <FaPlus size={20} />
            </div>
          </Flex>
          {errors.sizePhotos && (
            <Error error={errors.sizePhotos.message || ''} />
          )}
          <input
            accept='image/png, image/jpeg'
            ref={sizeRef}
            type='file'
            onChange={(e: any) => {
              const file = e.target.files[0];
              if (file) {
                setSizePhotos([...sizePhotos, file]);
                clearErrors('sizePhotos');
                const reader = new FileReader();

                reader.onloadend = () => {
                  setValue('sizePhotos', [
                    ...getValues().sizePhotos,
                    reader.result as string,
                  ]);
                  setSizePhotosPreview([
                    ...sizePhotosPreview,
                    reader.result as string,
                  ]);
                };

                reader.readAsDataURL(file);
              }
            }}
            style={{ display: 'none' }}
          />
        </Flex>
      </Flex>

      <Flex direction='column' gap={10}>
        <Button
          text='Создать'
          type='submit'
          isDisabled={Object.keys(errors).length !== 0}
        />

        {error && <Error error={error} />}
      </Flex>
    </form>
  );
}
