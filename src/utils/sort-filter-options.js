import dayjs from 'dayjs';

export const eventsByDay = (eventA, eventB) => dayjs(eventA.dateFrom).unix() - dayjs(eventB.dateFrom).unix();
export const eventsByTime = (eventA, eventB) => {
  const timeA = dayjs(eventA.dateTo).unix() - dayjs(eventA.dateFrom).unix();
  const timeB = dayjs(eventB.dateTo).unix() - dayjs(eventB.dateFrom).unix();
  return timeB - timeA;
};
export const eventsByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export const everythingEvents = () => true;
export const futureEvents = (event) => dayjs(event.dateFrom).isAfter(dayjs());
export const presentEvents = (event) => dayjs(event.dateFrom).isBefore(dayjs()) && dayjs(event.dateTo).isAfter(dayjs());
export const pastEvents = (event) => dayjs(event.dateTo).isBefore(dayjs());
