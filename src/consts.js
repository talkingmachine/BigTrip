import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

export const dateFormats = {
  time: 'HH:mm',
  date: 'MMM D',
  edit: 'd/m/Y H:i',
};
export const DEFAULT_DESTINATION = {
  id: 'Unknown',
  description: 'Sorry, destination unknown',
  name: '',
  pictures: [
  ]
};
export const DEFAULT_POINT = () => ({
  basePrice: '0',
  dateFrom: dayjs().format(),
  dateTo: dayjs().format(),
  destination: DEFAULT_DESTINATION.name,
  offers: [],
  id: nanoid(),
  type: 'taxi',
  isFavorite: false,
});
export const sortType = {
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
export const FilterTypes = {
  Everything: 'Everthing',
  Past: 'Past',
  Present: 'Present',
  Future: 'Future',
  Loading: 'Loading'
};
export const EditButtonsText = {
  Save: 'Save',
  Cancel: 'Cancel',
  Delete: 'Delete',
  Saving: 'Saving...',
  Deleting: 'Deleting...'
};

