import dayjs from 'dayjs';

export const sortEventsByDay = (array) => array.sort((eventA, eventB) => dayjs(eventA.dateFrom).unix() - dayjs(eventB.dateFrom).unix());

export const sortEventsByTime = (array) => array.sort((eventA, eventB) => {
  const timeA = dayjs(eventA.dateTo).unix() - dayjs(eventA.dateFrom).unix();
  const timeB = dayjs(eventB.dateTo).unix() - dayjs(eventB.dateFrom).unix();
  return timeB - timeA;
});

export const sortEventsByPrice = (array) => array.sort((eventA, eventB) => eventB.basePrice - eventA.basePrice);

