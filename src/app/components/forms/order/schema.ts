import * as yup from 'yup';

export default yup.object({
  PRICE_APP: yup.string(),
  PRICE: yup.string(),
  FIO: yup.string().required('Это обязательное поле'),
  PHONE_CLIENT: yup.string().required('Это обязательное поле'),
  STATUS: yup.string().required('Это обязательное поле'),
  DATE_WORK: yup.string(),
  DATE_END_WORK: yup.string(),
  DATE_CANCEL_WORK: yup.string(),
});
