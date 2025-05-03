'use client';

import { useState, useEffect } from 'react';
import nookies from 'nookies';

import Loader from '@/app/components/elements/loader';
import CalendarComponent from '@/app/components/elements/calendar';
import { API, SERVER_OK } from '@/app/utils/constants';

export default function Calendar() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSetDayStatusLoading, setIsSetDayStatusLoading] = useState(false);
  const [initialDays, setInitialDays] = useState<
    { day: string; year: string; month: string; status: string }[]
  >([]);

  const getDates = (y?: string, m?: string) => {
    let formData = new FormData();
    const year = y || String(new Date().getFullYear());
    const month = m || String(new Date().getMonth() + 1);

    formData.append(`filter[YEARS]`, year);
    formData.append(`filter[MOUNTH]`, month);

    fetch(`${API}/calendar/getForCurrent`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${nookies.get().token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (SERVER_OK.includes(response.code)) {
          const finalMonth = month < '9' ? `0${month}` : `${month}`;
          const days = [];

          for (const key in response.message[year][finalMonth]) {
            days.push({
              day: key,
              year,
              month: finalMonth,
              status: response.message[year][finalMonth][key].ID,
            });
          }

          setInitialDays(days);
        } else setError('Не удалось получить данные календаря');
      })
      .catch(() => setError('Не удалось получить данные календаря'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDates();
  }, []);

  const onSetDayHandler = async ({
    date,
    status,
  }: {
    date: string;
    status: string;
  }): Promise<void> => {
    let formData = new FormData();

    formData.append(`PROPS[DATE]`, date);
    formData.append(`PROPS[STATUS]`, status);

    setIsSetDayStatusLoading(true);

    fetch(`${API}/calendar/setDayForCurrent`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${nookies.get().token}`,
      },
    }).finally(() => setIsSetDayStatusLoading(false));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <CalendarComponent
      initialDays={initialDays}
      onSetDayStatus={onSetDayHandler}
      isLoading={isSetDayStatusLoading}
      getDates={(year, month) => getDates(year, month)}
    />
  );
}
