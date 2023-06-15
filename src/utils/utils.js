import dayjs from 'dayjs';
import { DATE_FORMATS } from '../consts';

export const getStartEndTime = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);

  const twoCharsNumber = (num) => String(num).padStart(2, '0');

  if (date2.diff(date1, 'hour') < 1) {
    return `${twoCharsNumber(date2.diff(date1, 'minute'))}M`;
  }
  if (date2.diff(date1, 'day') < 1) {
    const min = date2.diff(date1, 'minute');
    return `${twoCharsNumber(Math.ceil(min / 60))}H ${twoCharsNumber(min % 60)}M`;
  }
  if (date2.diff(date1, 'day') >= 1) {
    const min = date2.diff(date1, 'minute');
    return `${twoCharsNumber(Math.ceil(min / 60 / 24))}D ${twoCharsNumber(Math.ceil(min / 60 % 24))}H ${twoCharsNumber(min % 60)}M`;
  }
};

export const getHumanizedTime = (date) => dayjs(date).format(DATE_FORMATS.time);
export const getHumanizedDate = (date) => dayjs(date).format(DATE_FORMATS.date);
export const toCapitalized = (str) => str[0] + str.slice(1);
