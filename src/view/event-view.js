import AbstractView from '../framework/view/abstract-view.js';
import { getHumanizedDate, getHumanizedTime, getStartEndTime,} from '../utils/utils.js';
import { getEventOffers } from './get-event-offers.js';

function createEventTemplate(point, offers, destinationName) {
  const {basePrice, dateFrom, dateTo, type, isFavorite} = point;

  return (`
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${getHumanizedDate(dateFrom).toUpperCase()}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinationName}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${getHumanizedTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${getHumanizedTime(dateTo)}</time>
        </p>
        <p class="event__duration">${getStartEndTime(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${getEventOffers(offers)}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
}

export default class EventView extends AbstractView {
  #point = null;
  #offers = null;
  #destinationName = null;
  #replaceEventToEdit = null;
  #onStarClickHandler = null;

  constructor({point, offers, destinationName, replaceEventToEdit, onStarClickHandler}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinationName = destinationName;
    this.#replaceEventToEdit = replaceEventToEdit;
    this.#onStarClickHandler = onStarClickHandler;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#replaceEventToEdit);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onStarClickHandler);
  }

  get template() {
    return createEventTemplate(this.#point, this.#offers, this.#destinationName);
  }
}
