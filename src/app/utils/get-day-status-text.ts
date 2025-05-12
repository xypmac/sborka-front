export default function getDayStatusText(day: string) {
  if (day === '10') {
    return 'Свободный';
  } else if (day === '11') {
    return 'Выходной';
  } else if (day === '12') {
    return 'В работе';
  } else {
    return '';
  }
}
