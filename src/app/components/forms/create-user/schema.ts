import * as yup from 'yup';

import { REG_EXP } from '@/app/utils/constants';

export default yup.object({
  login: yup
    .string()
    .required('Это обязательное поле')
    .matches(REG_EXP.LOGIN, 'Только латинские символы и цифры')
    .min(4, 'Логин должен содержать 4 и более симолов')
    .max(48, 'Логин должен содержать 20 и менее символов'),
  password: yup
    .string()
    .required('Это обязательное поле')
    .matches(REG_EXP.PASSWORD, 'Не верный формат')
    .min(8, 'Пароль должен содержать 8 и более симолов')
    .max(48, 'Пароль должен содержать 48 и менее символов'),
  passwordConfirm: yup
    .string()
    .required('Это обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
  type: yup.string().required('Это обязательное поле'),
  phone: yup
    .string()
    .required('Это обязательное поле')
    .min(18, 'Не верный формат'),
  email: yup
    .string()
    .required('Это обязательное поле')
    .matches(REG_EXP.EMAIL, 'Не верный формат')
    .min(6, 'Пароль должен содержать 6 и более симолов')
    .max(40, 'Пароль должен содержать 40 и менее символов'),
  fio: yup.string().when(['group'], {
    is: (type: string) => type === '3' || type === '4',
    then: (schema) => schema.required('Это обязательное поле'),
  }),
  partner: yup.string().when('type', {
    is: '8',
    then: (schema) => schema.required('Это обязательное поле'),
  }),
  address: yup.string().when('type', {
    is: '8',
    then: (schema) => schema.required('Это обязательное поле'),
  }),
});
