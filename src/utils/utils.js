import dayjs from 'dayjs';
import { dateFormats } from '../consts';


export const getStartEndTime = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);

  const getTwoCharsNumber = (num) => String(num).padStart(2, '0');

  if (date2.diff(date1, 'hour') < 1) {
    return `${getTwoCharsNumber(date2.diff(date1, 'minute'))}M`;
  }
  if (date2.diff(date1, 'day') < 1) {
    const min = date2.diff(date1, 'minute');
    return `${getTwoCharsNumber(Math.ceil(min / 60))}H ${getTwoCharsNumber(min % 60)}M`;
  }
  if (date2.diff(date1, 'day') >= 1) {
    const min = date2.diff(date1, 'minute');
    return `${getTwoCharsNumber(Math.ceil(min / 60 / 24))}D ${getTwoCharsNumber(Math.ceil(min / 60 % 24))}H ${getTwoCharsNumber(min % 60)}M`;
  }
};

export const getHumanizedTime = (date) => dayjs(date).format(dateFormats.time);
export const getHumanizedDate = (date) => dayjs(date).format(dateFormats.date);
export const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
