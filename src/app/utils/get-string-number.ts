const getStringNumber = (phone: string) => {
  return phone
    .replaceAll('-', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll(' ', '');
};

export default getStringNumber;
