import CalendarComponent from '@/app/components/calendar';
import Auth from '@/app/components/auth';

export default function Calendar() {
  return <Auth component={<CalendarComponent />} />;
}
