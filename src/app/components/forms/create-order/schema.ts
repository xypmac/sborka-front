import * as yup from 'yup';

export default yup.object({
  address: yup.string().required(),
  price: yup.string().required(),
  name: yup.string().required(),
  phone: yup
    .string()
    .required('Это обязательное поле')
    .min(18, 'Не верный формат'),
  comment: yup.string(),
});
