import AuthLayout from '@/app/layouts/auth-layout';
import CalendarPage from '@/app/containers/pages/calendar';

export default function Calendar() {
  return (
    <AuthLayout>
      <CalendarPage />
    </AuthLayout>
  );
}
