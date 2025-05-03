export type CalendarProps = {
  isLoading: boolean;
  onSetDayStatus: ({ date, status }: { date: string; status: string }) => void;
  initialDays: { status: string; day: string; year: string; month: string }[];
  getDates: (y: string, m: string) => void;
};
