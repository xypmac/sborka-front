import * as yup from 'yup';

import { REG_EXP } from '@/app/constants';

export default yup.object({
  login: yup
    .string()
    .required('Это обязательное поле')
    .min(6, 'Логин должен содержать 6 и более симолов')
    .max(48, 'Логин должен содержать 20 и менее символов'),
  password: yup
    .string()
    .required('Это обязательное поле')
    .matches(REG_EXP.PASSWORD, 'Не верный формат')
    .min(6, 'Пароль должен содержать 6 и более симолов')
    .max(48, 'Пароль должен содержать 48 и менее символов'),
  email: yup
    .string()
    .required('Это обязательное поле')
    .matches(REG_EXP.EMAIL, 'Не верный формат')
    .min(6, 'Пароль должен содержать 6 и более симолов')
    .max(40, 'Пароль должен содержать 40 и менее символов'),
  phone: yup.string().required('Это обязательное поле'),
  type: yup.string().required('Это обязательное поле'),
  kontragent: yup.string().required('Это обязательное поле'),
  address: yup.string().required('Это обязательное поле'),
  fio: yup.string().required('Это обязательное поле'),
});
