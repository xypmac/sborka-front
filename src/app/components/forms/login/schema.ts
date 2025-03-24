import * as yup from 'yup';

export default yup.object({
  login: yup.string().required('Это обязательное поле'),
  password: yup.string().required('Это обязательное поле'),
});
