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

export type UsersType = {
  currentUser: User | null;
  users: User[] | [];
  usersTotal: number;
  wait: boolean;
  currentPage: number;
  error: string | null;
  filter: {
    name: string;
    group: string;
    active: 'Y' | 'N' | '';
  };
};
