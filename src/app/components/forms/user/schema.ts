import * as yup from 'yup';

export default yup.object({
  type: yup.string().required('Это обязательное поле'),
  phone: yup
    .string()
    .required('Это обязательное поле')
    .min(18, 'Не верный формат'),
  address: yup.string().when('type', {
    is: '8',
    then: (schema) => schema.required('Это обязательное поле'),
  }),
});
