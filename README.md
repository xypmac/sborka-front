# sborka

Фронтенд приложения для управления заказами на сборку мебели. Next.js + Redux Toolkit.

---

## Стек

- Next.js (App Router)
- Redux Toolkit
- React Hook Form + Yup
- react-datepicker, date-fns
- SCSS Modules

---

## Установка и запуск

```bash
npm install
npm run dev   # localhost:3000
```

Требует запущенный бэкенд (`F:\git\sborka-api`, localhost:4000).

---

## Роли пользователей

| Роль | Доступные страницы |
|---|---|
| Администратор | Все. Удаление заказов, деактивация пользователей |
| Бригадир | Все, кроме удаления/деактивации |
| Салон | `/`, `/orders/*`, `/orders/create` — только свои заказы |
| Сборщик | `/`, `/orders/[id]` — только заказы где он исполнитель (WORKER) |
| Замерщик | `/`, `/orders/[id]` — только заказы где он замерщик (MEASURER) |

---

## Структура

```
src/app/
  store/          — Redux: session, orders, users, calendar
  containers/     — умные компоненты (страницы, формы)
  components/     — UI-компоненты
  layouts/        — AuthLayout, MainLayout
  utils/          — константы, хелперы
```
