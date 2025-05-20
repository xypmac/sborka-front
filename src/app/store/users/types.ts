export type User = {
  ACTIVE: 'Y' | 'N';
  ID: string;
  LOGIN: string;
  EMAIL: string;
  PHONE_NUMBER: string;
  GROUP_ID: any;
  WORK_COMPANY?: string | null;
  NAME?: string | null;
  WORK_STREET?: string | null;
};

export type Active = 'Y' | 'N' | '';

export type Filter = {
  name: string;
  group: string;
  active: Active;
};

export type UsersType = {
  users: User[] | [];
  usersTotal: number;
  currentPage: number;
  error: string | null;
  filter: Filter;
  isWait: boolean;
};
