import { DATE_FORMATS, DEFAULT_DESTINATION } from '../consts';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { toCapitalized } from '../utils/utils';
import { getDestinationPictures } from './get-destination-pictures';
import { getEventEditOffers } from './get-event-edit-offers';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import { getEventEditDatalist } from './get-event-edit-datalist';


function createEventEditTemplate({point, destination, destinationsList, offers, isNew}) {
  const {basePrice, type} = point;

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
            ${toCapitalized(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          ${getEventEditDatalist(destinationsList)}
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
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${basePrice}"
            title="Numbers only"
            pattern="^[0-9]+$">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${isNew ? 'Cancel' : 'Delete'}</button>
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
  #point = null;
  #offers = null;
  #destinations = null;
  #onFormCloseClickHandler = null;
  #onFormSubmitHandler = null;
  #onDeleteClickHandler = null;
  #dateToPicker = null;
  #dateFromPicker = null;
  #isNew = null;

  constructor({point, offers, destinations, onFormCloseClickHandler, onFormSubmitHandler, onDeleteClickHandler, isNew}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormCloseClickHandler = onFormCloseClickHandler;
    this.#onFormSubmitHandler = onFormSubmitHandler;
    this.#onDeleteClickHandler = onDeleteClickHandler;
    this.#isNew = isNew;

    this._setState(this.#point);
    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate({
      point: this._state,
      destination: this.#pickCurrentDestination(),
      destinationsList: this.#destinations,
      offers: this.#pickCurrentTypeOffers(),
      isNew: this.#isNew
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);

    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
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
        dateFormat: DATE_FORMATS.edit,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
      },
    );
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DATE_FORMATS.edit,
        defaultDate: this._state.dateTo,
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

  #changePriceHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value,
    });
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
    if (this.#destinations.map((destintaion) => destintaion.name).includes(evt.target.value)) {
      this.updateElement({
        destination: evt.target.value
      });
    }
  };

  #pickCurrentTypeOffers() {
    const currentTypeOffers = this.#offers.find((offer) => offer.type === this._state.type);
    return currentTypeOffers ? currentTypeOffers.offers : [];
  }

  #pickCurrentDestination() {
    const currentDestination = this.#destinations.find((destination) => destination.id === this._state.destination);
    if (currentDestination) {
      return currentDestination;
    }
    return DEFAULT_DESTINATION;
  }

  #closeFormHandler = () => {
    if (this.#isNew) {
      this.#deleteClickHandler();
      return;
    }
    this.updateElement(this.#point);
    this.#onFormCloseClickHandler();
  };

  #deleteClickHandler = () => {
    this.#onDeleteClickHandler(this._state, this.#isNew);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (this._state.destination) {
      if (this.#isNew) {
        this.#isNew = false;
      }
      this.#onFormSubmitHandler(this._state);
    }
  };
}
