import { DEFAULT_DESTINATION, DEFAULT_POINT, EDIT_TIME_FORMAT } from '../consts';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getHumanizedEditTime, toCapitalized } from '../utils';
import { getDestinationPictures } from './get-destination-pictures';
import { getEventEditOffers } from './get-event-edit-offers';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


function createEventEditTemplate({point, destination, offers}) {
  const {basePrice, dateFrom, dateTo, type} = point;

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type : DEFAULT_POINT.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${toCapitalized(type ? type : DEFAULT_POINT.type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination ? point.destination : DEFAULT_POINT.destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice ? basePrice : DEFAULT_POINT.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${getEventEditOffers(offers, point.offers)}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${getDestinationPictures(destination.pictures)}
            </div>
          </div>
          </section>
        </section>
      </form>
  </li>`;
}

export default class EventEditView extends AbstractStatefulView{
  #offers = null;
  #destinations = null;
  #replaceEditToEvent = null;
  #onEscKeydownHandler = null;
  #dateToPicker = null;
  #dateFromPicker = null;

  constructor({point, offers, destinations, replaceEditToEvent, onEscKeydownHandler}) {
    super();
    this._setState(point);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#replaceEditToEvent = replaceEditToEvent;
    this.#onEscKeydownHandler = onEscKeydownHandler;
    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate({
      point: this._state,
      destination: this.#pickCurrentDestination(),
      offers: this.#pickCurrentTypeOffers(),
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOfferHandler);
    }
    this.#setDatepickers();
  }

  removeElement() {
    super.removeElement();

    if (this.#dateToPicker || this.#dateFromPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
  }

  #setDatepickers () {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: EDIT_TIME_FORMAT,
        defaultDate: this._state.dateFrom ? this._state.dateFrom : DEFAULT_POINT.dateFrom, // ${getHumanizedEditTime(dateFrom ? dateFrom : DEFAULT_POINT.dateFrom)}
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
      },
    );
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: EDIT_TIME_FORMAT,
        defaultDate: this._state.dateTo ? this._state.dateTo : DEFAULT_POINT.dateTo, // ${getHumanizedEditTime(dateTo ? dateTo : DEFAULT_POINT.dateTo)}
        onChange: this.#dateToChangeHandler,
        enableTime: true,
      },
    );
  }

  #dateFromChangeHandler = ([date]) => {
    this.updateElement({
      dateFrom: date
    });
  };

  #dateToChangeHandler = ([date]) => {
    this.updateElement({
      dateTo: date
    });
  };

  #changeOfferHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.checked) {
      this.updateElement({
        offers: [...this._state.offers, evt.target.id],
      });
    } else {
      this.updateElement({
        offers: this._state.offers.filter((offerId) => offerId !== evt.target.id),
      });
    }
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value
    });
  };

  #pickCurrentTypeOffers() {
    return this.#offers.find((offer) => offer.type === this._state.type).offers;
  }

  #pickCurrentDestination() {
    const destinaion = this.#destinations.find((destination) => destination.name === this._state.destination);
    if (destinaion) {
      return destinaion;
    }
    return DEFAULT_DESTINATION;
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    document.removeEventListener('keydown', this.#onEscKeydownHandler);
    this.#replaceEditToEvent();
  };

  #rollupClickHandler = () => {
    document.removeEventListener('keydown', this.#onEscKeydownHandler);
    this.#replaceEditToEvent();
  };
}
