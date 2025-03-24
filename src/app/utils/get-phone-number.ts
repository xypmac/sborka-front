export default function getPhoneFormat(value: string): string {
  let currentPhoneValue: any = value
    .replace('+7', '')
    .replace(/^89/, '9')
    .replace(/^79/, '9')
    .replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

  currentPhoneValue = !currentPhoneValue[2]
    ? `(${currentPhoneValue[1]}`
    : '(' +
      currentPhoneValue[1] +
      ') ' +
      currentPhoneValue[2] +
      (currentPhoneValue[3] ? '-' + currentPhoneValue[3] : '') +
      (currentPhoneValue[4] ? '-' + currentPhoneValue[4] : '');

  const result = `${currentPhoneValue.length && currentPhoneValue !== '(' ? '+7' : ''} ${
    currentPhoneValue !== '(' ? currentPhoneValue : ''
  }`;

  return result.trim();
}
