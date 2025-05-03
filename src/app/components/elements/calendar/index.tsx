'use client';

import { ReactElement, useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import cn from 'classnames';

import DayStatus from '@/app/components/elements/day-status';

import { CalendarProps } from './types';
import styles from './styles.module.scss';

const DAYS_STATUS = {
  FREE: 'Cвободный',
  WEEKEND: 'Выходной',
};

export default function Calendar({
  initialDays,
  onSetDayStatus,
  isLoading,
  getDates,
}: CalendarProps): ReactElement {
  const [dates, setDates] = useState<{ title: string; date: string }[]>([]);
  const [currentDay, setCurrentDay] = useState('');
  const [isShowDaySettings, setIsShowSettings] = useState(false);

  const calendarRef = useRef<any>(null);
  console.log(initialDays);
  useEffect(() => {
    setDates([
      ...initialDays.map((initialDay) => {
        return {
          title:
            initialDay.status === '10' ? DAYS_STATUS.FREE : DAYS_STATUS.WEEKEND,
          date: `${initialDay.year}-${initialDay.month}-${initialDay.day}`,
        };
      }),
    ]);
  }, [initialDays]);

  const onClickDateHandler = ({ dateStr }: { dateStr: string }) => {
    setCurrentDay(dateStr);
    setIsShowSettings(true);
  };

  const onSaveDayHandler = (status: string) => {
    const dayWithStatus = dates.find(
      (day: { date: string }) => day.date === currentDay
    );
    const a = currentDay.split('-');
    const result = `${a[2]}.${a[1]}.${a[0]}`;

    onSetDayStatus({ date: result, status: status });

    setIsShowSettings(false);
    setCurrentDay('');
    if (dayWithStatus) {
      setDates(
        dates.map((date: { title: string; date: string }) => {
          if (date.date === currentDay) {
            return {
              date: currentDay,
              title: status === '10' ? DAYS_STATUS.FREE : DAYS_STATUS.WEEKEND,
            };
          }

          return date;
        })
      );
    } else {
      setDates([
        ...dates,
        {
          title: status === '10' ? DAYS_STATUS.FREE : DAYS_STATUS.WEEKEND,
          date: currentDay,
        },
      ]);
    }
  };

  return (
    <div className={cn(styles.calendar, isLoading && styles.isLoading)}>
      {isShowDaySettings && (
        <DayStatus
          date={currentDay}
          onHide={() => setIsShowSettings(false)}
          onSave={onSaveDayHandler}
        />
      )}
      <FullCalendar
        locale={ruLocale}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={onClickDateHandler}
        ref={calendarRef}
        events={dates}
        eventBackgroundColor='#514fe4'
        eventBorderColor='#514fe4'
        headerToolbar={{ start: 'title', end: 'prevButton,nextButton' }}
        titleFormat={{ year: 'numeric', month: 'short' }}
        customButtons={{
          nextButton: {
            icon: 'chevron-right',
            click: function () {
              const api = calendarRef.current.getApi();
              getDates(
                String(api.getDate().getFullYear()),
                String(api.getDate().getMonth() + 2)
              );
              api.next();
            },
          },
          prevButton: {
            icon: 'chevron-left',
            click: function () {
              const api = calendarRef.current.getApi();
              getDates(
                String(api.getDate().getFullYear()),
                String(api.getDate().getMonth())
              );
              api.prev();
            },
          },
        }}
      />
    </div>
  );
}
