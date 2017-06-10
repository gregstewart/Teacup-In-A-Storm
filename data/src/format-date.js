import { format } from 'date-fns';

const toMilliSeconds = number => (number * 1000);

export default function (date) {
  let tempDate;
  if (isNaN(date)) {
    tempDate = new Date(date);
  } else if (Number.isInteger(parseInt(date, 10))) {
    tempDate = toMilliSeconds(date);
  } else {
    tempDate = date;
  }

  return format(tempDate, 'YYYY/MM/DD @ HH:mm');
}
