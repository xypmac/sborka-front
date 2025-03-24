const getOrderStatusText = (status: string) => {
  if (status === '5') {
    return 'Новая';
  } else if (status === '6') {
    return 'В работе';
  } else if (status === '7') {
    return 'Выполнено';
  } else if (status === '8') {
    return 'Приостановлено';
  } else if (status === '9') {
    return 'Отменненая сборка';
  } else {
    return 'Новая';
  }
};

export default getOrderStatusText;
