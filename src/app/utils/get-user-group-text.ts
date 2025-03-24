const getUserGroupText = (userGroup: object | string) => {
  const group =
    typeof userGroup !== 'string' ? Object.keys(userGroup)[0] : userGroup;

  if (group === '1') {
    return 'Aдминистратор';
  } else if (group === '6') {
    return 'Бригадир';
  } else if (group === '8') {
    return 'Салон';
  } else if (group === '7') {
    return 'Сборщик';
  } else if (group === '9') {
    return 'Замерщик';
  } else {
    return '';
  }
};

export default getUserGroupText;
