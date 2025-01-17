import * as yup from 'yup';

import { REG_EXP } from '@/app/constants';

export default yup.object({
  email: yup
    .string()
    .required('Это обязательное поле')
    .matches(REG_EXP.EMAIL, 'Не верный формат')
    .min(6, 'Пароль должен содержать 6 и более симолов')
    .max(40, 'Пароль должен содержать 40 и менее символов'),
  password: yup
    .string()
    .required('Это обязательное поле')
    .min(6, 'Пароль должен содержать 6 и более симолов')
    .max(48, 'Пароль должен содержать 48 и менее символов'),
});
