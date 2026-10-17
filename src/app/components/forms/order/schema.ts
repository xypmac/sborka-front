import * as yup from 'yup';

export default yup.object({
  PRICE_APP: yup.string(),
  PRICE: yup.string(),
  ADDRESS: yup.string(),
  FIO: yup.string(),
  PHONE_CLIENT: yup.string(),
  STATUS: yup.string().required('Выберите статус'),
  DATE_WORK: yup.string(),
  DATE_END_WORK: yup.string(),
  DATE_CANCEL_WORK: yup.string(),
});
