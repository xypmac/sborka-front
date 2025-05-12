'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';

import Images from '@/app/components/images';
import Error from '@/app/components/elements/error';
import Flex from '@/app/components/elements/flex';
import Label from '@/app/components/elements/label';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import getPhoneFormat from '@/app/utils/get-phone-number';

import schema from './schema';
import { CreateOrderProps, Fields, FieldsName } from './types';
import styles from './styles.module.scss';

export default function CreateOrder({
  onCreateOrder,
  isSalon,
  isWait,
  error,
}: CreateOrderProps) {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      sketchPhotos: [],
      address: '',
      price: '',
      name: '',
      phone: '',
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

  const onChangeHandler = (value: string, field: FieldsName) => {
    let result = value;

    if (field === 'phone') result = getPhoneFormat(value);
    if (field === 'price') result = value.replace(/\D/, '');

    setValue(field, result, {
      shouldValidate: true,
    });
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
            onChange={onChangeHandler}
          />
        </Flex>
        <Flex gap={4} direction='column'>
          <Label>ФИО клиента</Label>
          <Input
            name='name'
            placeholder='ФИО клиета'
            register={register}
            error={errors.name?.message || null}
            onChange={onChangeHandler}
          />
        </Flex>
        <Flex gap={4} direction='column'>
          <Label>Номер клиента</Label>
          <Input
            name='phone'
            placeholder='Номер клиента'
            register={register}
            error={errors.phone?.message || null}
            onChange={onChangeHandler}
          />
        </Flex>
        <Flex gap={4} direction='column'>
          <Label>Адрес клиента</Label>
          <Input
            name='address'
            placeholder='Адрес клиента'
            register={register}
            error={errors.address?.message || null}
            onChange={onChangeHandler}
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
              onChange={onChangeHandler}
            />
          </Flex>
        )}
        <Flex gap={4} direction='column'>
          <Label>Эскиз</Label>
          <Images
            list={getValues().sketchPhotos || []}
            onAdd={() => sketchRef.current && sketchRef.current.click()}
          />
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
          <Label>Фото помещения</Label>
          <Images
            list={getValues().roomPhotos || []}
            onAdd={() => roomRef.current && roomRef.current.click()}
          />
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
                    ...(getValues().roomPhotos || []),
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
          <Label>Замер</Label>
          <Images
            list={getValues().sizePhotos || []}
            onAdd={() => sizeRef.current && sizeRef.current.click()}
          />
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
                    ...(getValues().sizePhotos || []),
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
