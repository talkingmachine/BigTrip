import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

export const DATE_FORMATS = {
  time: 'HH:mm',
  date: 'MMM D',
  edit: 'd/m/Y H:i',
};
export const DEFAULT_POINT = () => ({
  basePrice: '0',
  dateFrom: dayjs().format(),
  dateTo: dayjs().format(),
  destination: '',
  offers: [],
  id: nanoid(),
  type: 'taxi',
  isFavorite: false,
});
export const DEFAULT_DESTINATION = {
  description: 'Sorry, destination unknown',
  name: 'Unknown',
  pictures: [
  ]
};
export const SORT_TYPE = {
  byDay: 'sort-day',
  byTime: 'sort-time',
  byPrice: 'sort-price',
};
export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};
export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};
export const FILTER_TYPES = {
  Everything: 'Everthing',
  Past: 'Past',
  Present: 'Present',
  Future: 'Future',
  Loading: 'Loading'
};

