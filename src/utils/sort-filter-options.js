import dayjs from 'dayjs';

export const sortEventsByDay = (eventA, eventB) => dayjs(eventA.dateFrom).unix() - dayjs(eventB.dateFrom).unix();
export const sortEventsByTime = (eventA, eventB) => {
  const timeA = dayjs(eventA.dateTo).unix() - dayjs(eventA.dateFrom).unix();
  const timeB = dayjs(eventB.dateTo).unix() - dayjs(eventB.dateFrom).unix();
  return timeB - timeA;
};
export const sortEventsByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export const filterByEverythingEvents = () => true;
export const filterByFutureEvents = (event) => dayjs(event.dateFrom).isAfter(dayjs());
export const filterByPresentEvents = (event) => dayjs(event.dateFrom).isBefore(dayjs()) && dayjs(event.dateTo).isAfter(dayjs());
export const filterByPastEvents = (event) => dayjs(event.dateTo).isBefore(dayjs());
