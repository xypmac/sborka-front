export const WELCOME_MODE = {
  LOGIN: 'login',
  REGISTRATION: 'registration',
};

export const REG_EXP = {
  PASSWORD: /^[a-zA-Z\d#?!@$%^&*-]+$/,
  LOGIN: /^[a-zA-Z0-9]*$/,
  PHONE: /^[0-9]*$/,
  EMAIL: /^[-\w.]+@([A-z0-9][-A-z0-9]+\D)+[A-z]{2,4}$/,
};

export const PAGES = {
  MAIN: '/',
  USERS: '/users',
  USER: '/user/[id]',
  CALENDAR: '/calendar',
};

export const HOST = 'https://sborkatestqwety.ru/';
export const API = `${HOST}api/v1`;

export const SERVER_ERRORS = [400, 404, 500];
export const SERVER_OK = [200];

export const SERVER_ERRORS_TEXT = {
  ORDER_EXIST: 'Заказ с таким номером уже существует',
};

export const EXPIRED_TOKEN_ERROR = 'Срoк токена истек. Пройдите авторизацию';

export const USERS_GROUP = [
  {
    id: 7,
    title: 'Сборщик',
  },
  {
    id: 9,
    title: 'Замерщик',
  },
  {
    id: 8,
    title: 'Салон',
  },
];

export const USERS_GROUP_FILTER = [...USERS_GROUP, { id: 0, title: 'Все' }];

export const CALENDAR_USERS_GROUP_FILTER = [
  {
    id: 7,
    title: 'Сборщик',
  },
  {
    id: 9,
    title: 'Замерщик',
  },
];

export const CALENDAR_ORDERS_SEARCH_TYPE = [
  {
    id: 1,
    title: 'Поиск по id',
  },
  {
    id: 2,
    title: 'Поиск по ФИО клиента',
  },
  {
    id: 3,
    title: 'Поиск по адресу',
  },
];

export const DAY_STATUS = [
  { id: 10, title: 'Свободный' },
  { id: 11, title: 'Выходной' },
  { id: 12, title: 'В работе' },
];

export const ACTIVITY_GROUP = [
  { id: 1, title: 'Активен' },
  { id: 2, title: 'Не активен' },
  { id: 3, title: 'Все' },
];

export const ORDER_STATUS_GROUP = [
  { id: 5, title: 'Новая' },
  { id: 6, title: 'В работе' },
  { id: 7, title: 'Выполнено' },
  { id: 8, title: 'Приостановлено' },
  { id: 9, title: 'Отменненая сборка' },
];

export const ORDER_STATUS_GROUP_FILTER = [
  ...ORDER_STATUS_GROUP,
  { id: 10, title: 'Все' },
];
