export type CalendarUser = {
  ID: number;
  NAME: string;
};

export type CalendarType = {
  users: CalendarUser[] | [];
  usersTotal: number;
  wait: boolean;
  currentPage: number;
  error: string | null;
  filter: {
    date: string;
    name?: string;
    group?: string;
    status?: string;
  };
};
