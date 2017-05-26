import { format } from 'date-fns';

const toMilliSeconds = number => (number * 1000);

export default function (date) {
  let tempDate;
  if (isNaN(date)) {
    tempDate = new Date(date);
  } else {
    tempDate = toMilliSeconds(date);
  }

  if (Object.prototype.toString.call(tempDate) === '[object Date]' && isNaN(tempDate.getTime())) {
    tempDate = toMilliSeconds(parseInt(date, 10));
  }
  return format(tempDate, 'YYYY/MM/DD @ HH:mm');
}
