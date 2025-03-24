const getUserActivityText = (activity: string) => {
  if (activity === '1') {
    return 'Активен';
  } else if (activity === '2') {
    return 'Не активен';
  } else {
    return '';
  }
};

export default getUserActivityText;
