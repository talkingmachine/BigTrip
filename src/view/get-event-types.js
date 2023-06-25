import { capitalize } from '../utils/utils';

export function getEventTypes(offersTypes, type) {
  return (`
    <legend class="visually-hidden">Event type</legend>
      ${offersTypes.map((offersType) =>
      `<div class="event__type-item">
        <input id="event-type-${offersType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offersType}" ${type === offersType ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${offersType}" for="event-type-${offersType}-1">${capitalize(offersType)}</label>
      </div>
    `).join('')}`
  );
}
