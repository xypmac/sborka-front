'use client';

import { useRef, useEffect } from 'react';
import { useForm, Controller, Resolver } from 'react-hook-form';
import cn from 'classnames';
import DatePicker from 'react-datepicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, parse, isValid } from 'date-fns';
import { ru } from 'date-fns/locale';

import Flex from '@/app/components/elements/flex';
import Label from '@/app/components/elements/label';
import Select from '@/app/components/elements/select';
import FindUser from '@/app/containers/elements/find-user';
import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import { ORDER_STATUS_GROUP } from '@/app/utils/constants';
import getOrderStatusText from '@/app/utils/get-order-status-text';
import { User } from '@/app/store/users/types';

import schema from './schema';
import { OrderProps, Fields } from './types';
import styles from './styles.module.scss';

export default function Order({
  order,
  users,
  isWait,
  isAdmin,
  isTaskmaster,
  isMasurer,
  isBuilder,
  isSalon,
  onUpdateOrder,
  onShowModal,
}: OrderProps) {
  const worker = useRef<string | null>(null);
  const salon = useRef<string | null>(null);
  const measurer = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      ADDRESS: order.ADDRESS || '',
      PRICE_APP: order.PRICE_APP || '',
      PRICE: order.PRICE || '',
      FIO: order.FIO,
      PHONE_CLIENT: order.PHONE_CLIENT,
      STATUS: order.STATUS || '5',
      DATE_WORK: order.DATE_WORK || '',
      DATE_END_WORK: order.DATE_END_WORK || '',
      DATE_CANCEL_WORK: order.DATE_CANCEL_WORK || '',
    },
    resolver: yupResolver(schema) as Resolver<Fields>,
  });

  useEffect(() => {
    reset({
      ADDRESS: order.ADDRESS || '',
      PRICE_APP: order.PRICE_APP || '',
      PRICE: order.PRICE || '',
      FIO: order.FIO || '',
      PHONE_CLIENT: order.PHONE_CLIENT || '',
      STATUS: order.STATUS || '5',
      DATE_WORK: order.DATE_WORK || '',
      DATE_END_WORK: order.DATE_END_WORK || '',
      DATE_CANCEL_WORK: order.DATE_CANCEL_WORK || '',
    });
  }, [order.PRICE_APP, order.PRICE, order.STATUS, order.DATE_WORK, order.DATE_END_WORK, order.DATE_CANCEL_WORK]);

  const isShowDates = isAdmin || isTaskmaster || isBuilder || isSalon;

  const CustomDatepickerInput = ({
    value,
    isDisabled,
    onClick,
  }: {
    value: any;
    isDisabled: boolean;
    onClick: any;
  }) => (
    <button
      className={cn(styles.datepicker, isDisabled && styles.disabled)}
      onClick={onClick}
      type='button'
    >
      {value ? value : 'Выбрать дату'}
    </button>
  );
  const parseDate = (val: string | undefined) => {
    if (!val) return null;
    const d = parse(val, 'dd.MM.yyyy', new Date());
    return isValid(d) ? d : null;
  };

  const getClearButton = (
    field: 'DATE_END_WORK' | 'DATE_WORK' | 'DATE_CANCEL_WORK'
  ) => {
    return (
      <p
        className={styles.clear}
        onClick={() => setValue(field, '', { shouldValidate: true })}
      >
        Очистить
      </p>
    );
  };

  return (
    <form
      className={cn(styles.content, isWait && styles.wait)}
      onSubmit={handleSubmit((data) =>
        onUpdateOrder({
          ORDER_ID: order.ORDER_ID,
          WORKER: worker.current,
          SALON: salon.current,
          MEASURER: measurer.current,
          ...data,
        })
      )}
    >
      <div className={styles.item}>
        <Label>Статус заказа</Label>
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
          <div className={cn(styles.item, styles.date)}>
            <Label mb='4'>Дата сборки</Label>
            <Controller
              name='DATE_WORK'
              control={control}
              render={({ field: { name, value } }) => (
                <DatePicker
                  disabled={isBuilder || isSalon}
                  locale={ru}
                  selected={parseDate(value)}
                  dateFormat='dd.MM.yyyy'
                  onChange={(e: Date | null) => {
                    setValue(name, e ? format(e, 'dd.MM.yyyy') : '', { shouldValidate: true });
                  }}
                  customInput={
                    <CustomDatepickerInput
                      value={''}
                      isDisabled={isBuilder || isSalon}
                      onClick={() => false}
                    />
                  }
                />
              )}
            />
            {isAdmin && getValues().DATE_WORK !== '' && getClearButton('DATE_WORK')}
          </div>

          <div className={cn(styles.item, styles.date)}>
            <Label mb='4'>Дата окончания</Label>
            <Controller
              name='DATE_END_WORK'
              control={control}
              render={({ field: { name, value } }) => (
                <DatePicker
                  disabled={isBuilder || isSalon}
                  locale={ru}
                  selected={parseDate(value)}
                  dateFormat='dd.MM.yyyy'
                  onChange={(e: Date | null) => {
                    setValue(name, e ? format(e, 'dd.MM.yyyy') : '', { shouldValidate: true });
                  }}
                  customInput={
                    <CustomDatepickerInput
                      value={''}
                      isDisabled={isBuilder || isSalon}
                      onClick={() => false}
                    />
                  }
                />
              )}
            />
            {isAdmin && getValues().DATE_END_WORK !== '' &&
              getClearButton('DATE_END_WORK')}
          </div>

          <div className={cn(styles.item, styles.date)}>
            <Label mb='4'>Дата отмены</Label>
            <Controller
              name='DATE_CANCEL_WORK'
              control={control}
              render={({ field: { name, value } }) => (
                <DatePicker
                  disabled={isBuilder || isSalon}
                  locale={ru}
                  selected={parseDate(value)}
                  dateFormat='dd.MM.yyyy'
                  onChange={(e: Date | null) => {
                    setValue(name, e ? format(e, 'dd.MM.yyyy') : '', { shouldValidate: true });
                  }}
                  customInput={
                    <CustomDatepickerInput
                      value={''}
                      isDisabled={isBuilder || isSalon}
                      onClick={() => false}
                    />
                  }
                />
              )}
            />
            {isAdmin && getValues().DATE_CANCEL_WORK !== '' &&
              getClearButton('DATE_CANCEL_WORK')}
          </div>
        </div>
      )}

      {(isAdmin || isTaskmaster || isSalon) && (
        <div className={styles.item}>
          <Label>Cтоимость</Label>
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
          <Label>Финальная цена</Label>
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

      <Flex direction='column' gap={20}>
        {!isMasurer && (
          <FindUser
            onSet={(id: string | null) => (worker.current = id)}
            isDisabled={isBuilder || isSalon}
            label='Сборщик'
            placeholder='Введите ФИО пользователя'
            userID={order.WORKER}
            users={users.filter((user: User) => user.GROUP_ID === '7' && user.ACTIVE === 'Y')}
            onShowModal={onShowModal}
          />
        )}
        {!isBuilder && (
          <FindUser
            onSet={(id: string | null) => (measurer.current = id)}
            isDisabled={isMasurer || isSalon}
            label='Замерщик'
            placeholder='Введите ФИО пользователя'
            userID={order.MEASURER}
            users={users.filter((user: User) => user.GROUP_ID === '9' && user.ACTIVE === 'Y')}
            onShowModal={onShowModal}
          />
        )}
        <FindUser
          onSet={(id: string | null) => (salon.current = id)}
          isSalon
          isDisabled={isBuilder || isMasurer || isSalon}
          label='Салон'
          placeholder='Введите название контрагента'
          userID={order.SALON}
          users={users.filter((user: User) => user.GROUP_ID === '8' && user.ACTIVE === 'Y')}
          onShowModal={onShowModal}
        />
      </Flex>

      {typeof order.FIO === 'string' && (
        <div className={styles.item}>
          <Label>ФИО клиента</Label>
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
          <Label>Номер клиента</Label>
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

      {typeof order.ADDRESS === 'string' && (
        <div className={styles.item}>
          <Label>Адрес клиента</Label>
          <Input
            isDisable
            name='ADDRESS'
            placeholder='Адрес клиента'
            register={register}
            error={null}
            onChange={() => false}
          />
        </div>
      )}

      <Button type='submit' isDisabled={Object.keys(errors).length !== 0}>
        Сохранить
      </Button>
    </form>
  );
}
