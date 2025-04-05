import * as yup from 'yup';

const photos = yup
  .string()
  .required('Необходимо добавить один или несколько файлов');

export default yup.object({
  address: yup.string().required('Это обязательное поле'),
  price: yup.string().required('Это обязательное поле'),
  name: yup.string().required('Это обязательное поле'),
  phone: yup
    .string()
    .required('Это обязательное поле')
    .min(18, 'Не верный формат'),
  sketchPhotos: yup
    .array()
    .of(photos)
    .min(1)
    .min(1, 'Необходимо добавить один или несколько файлов')
    .required('Необходимо добавить один или несколько файлов'),
  comment: yup.string(),
  roomPhotos: yup.array(),
  sizePhotos: yup.array(),
});
