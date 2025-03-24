'use client';

import { forwardRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import cn from 'classnames';
import DatePicker from 'react-datepicker';
import { yupResolver } from '@hookform/resolvers/yup';
import ru from 'date-fns/locale/ru';

import Select from '@/app/components/elements/select';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import Error from '@/app/components/elements/error';
import { ORDER_STATUS_GROUP } from '@/app/utils/constants';
import getOrderStatusText from '@/app/utils/get-order-status-text';

import schema from './schema';
import { OrderProps, Fields } from './types';
import styles from './styles.module.scss';

export default function Order({
  order,
  isWait,
  isAdmin,
  isTaskmaster,
  isMasurer,
  isBuilder,
  isSalon,
  onUpdateOrder,
}: OrderProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      PRICE_APP: order.PRICE_APP || '',
      PRICE: order.PRICE || '',
      FIO: order.FIO,
      PHONE_CLIENT: order.PHONE_CLIENT,
      STATUS: order.STATUS || '5',
      DATE_WORK: order.DATE_WORK || '',
      DATE_END_WORK: order.DATE_END_WORK || '',
      DATE_CANCEL_WORK: order.DATE_CANCEL_WORK || '',
    },
    resolver: yupResolver(schema),
  });

  const isShowDates =
    (isAdmin || isTaskmaster || isBuilder || isSalon) &&
    (getValues().STATUS === '6' ||
      getValues().STATUS === '7' ||
      getValues().STATUS === '9');

  const CustomInput = forwardRef(
    (
      {
        value,
        isDisabled,
        onClick,
      }: { value: any; isDisabled: boolean; onClick: any },
      ref
    ) => (
      <button
        className={cn(styles.datepicker, isDisabled && styles.disabled)}
        onClick={onClick}
        type='button'
      >
        {value}
      </button>
    )
  );

  return (
    <form
      className={cn(styles.content, isWait && styles.wait)}
      onSubmit={handleSubmit((data) =>
        onUpdateOrder({ ORDER_ID: order.ORDER_ID, ...data })
      )}
    >
      {(isAdmin || isTaskmaster || isSalon) && (
        <div className={styles.item}>
          <p className={styles.label}>Cтоимость</p>
          <Input
            isDisable={isSalon}
            name='PRICE_APP'
            placeholder='Cтоимость'
            register={register}
            error={errors.PRICE_APP?.message || null}
            onChange={(value) => {
              setValue('PRICE_APP', value.replace(/\D/, ''), {
                shouldValidate: true,
              });
            }}
          />
        </div>
      )}

      {(isAdmin || isTaskmaster || isBuilder) && (
        <div className={styles.item}>
          <p className={styles.label}>Финальная цена</p>
          <Input
            isDisable={isBuilder}
            name='PRICE'
            placeholder='Финальная цена'
            register={register}
            error={errors.PRICE?.message || null}
            onChange={(value) => {
              setValue('PRICE', value.replace(/\D/, ''), {
                shouldValidate: true,
              });
            }}
          />
        </div>
      )}

      {typeof order.FIO === 'string' && (
        <div className={styles.item}>
          <p className={styles.label}>ФИО клиента</p>
          <Input
            isDisable
            name='FIO'
            placeholder='ФИО клиента'
            register={register}
            error={null}
            onChange={() => false}
          />
        </div>
      )}

      {typeof order.PHONE_CLIENT === 'string' && (
        <div className={styles.item}>
          <p className={styles.label}>Номер клиента</p>
          <Input
            isDisable
            name='PHONE_CLIENT'
            placeholder='Номер клиента'
            register={register}
            error={null}
            onChange={() => false}
          />
        </div>
      )}

      <div className={styles.item}>
        <p className={styles.label}>Статус заказа</p>
        <Select
          isDisable={isMasurer || isSalon}
          defaultOption='Статус заказа'
          onSelect={(value: string) =>
            setValue('STATUS', value, { shouldValidate: true })
          }
          options={ORDER_STATUS_GROUP}
          error={errors.STATUS?.message || null}
          value={getOrderStatusText(order.STATUS)}
        />
      </div>

      {isShowDates && (
        <div className={styles.dates}>
          {getValues().STATUS === '6' && (
            <div className={cn(styles.item, styles.date)}>
              <p className={styles.label}>Даты начала сборки</p>
              <Controller
                name='DATE_WORK'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    disabled={isBuilder || isSalon}
                    locale={ru}
                    selected={
                      value === '' ? new Date() : new Date(value as string)
                    }
                    dateFormat='dd.MM.yyyy'
                    onChange={onChange}
                    customInput={
                      <CustomInput
                        value={''}
                        isDisabled={isBuilder || isSalon}
                        onClick={() => false}
                      />
                    }
                  />
                )}
              />
            </div>
          )}

          {getValues().STATUS === '7' && (
            <div className={cn(styles.item, styles.date)}>
              <p className={styles.label}>Дата окончания сборки</p>
              <Controller
                name='DATE_END_WORK'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    disabled={isBuilder || isSalon}
                    locale={ru}
                    selected={
                      value === '' ? new Date() : new Date(value as string)
                    }
                    dateFormat='dd.MM.yyyy'
                    onChange={onChange}
                    customInput={
                      <CustomInput
                        value={''}
                        isDisabled={isBuilder || isSalon}
                        onClick={() => false}
                      />
                    }
                  />
                )}
              />
            </div>
          )}

          {getValues().STATUS === '9' && (
            <div className={cn(styles.item, styles.date)}>
              <p className={styles.label}>Дата отмены сборки</p>
              <Controller
                name='DATE_CANCEL_WORK'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    disabled={isBuilder || isSalon}
                    locale={ru}
                    selected={
                      value === '' ? new Date() : new Date(value as string)
                    }
                    dateFormat='dd.MM.yyyy'
                    onChange={onChange}
                    customInput={
                      <CustomInput
                        value={''}
                        isDisabled={isBuilder || isSalon}
                        onClick={() => false}
                      />
                    }
                  />
                )}
              />
            </div>
          )}
        </div>
      )}

      <Button
        text='Сохранить'
        type='submit'
        isDisabled={Object.keys(errors).length !== 0}
      />
    </form>
  );
}
