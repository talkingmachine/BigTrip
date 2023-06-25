import { DEFAULT_DESTINATION, dateFormats, EditButtonsText } from '../consts';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getDestinationPictures } from './get-destination-pictures';
import { getEventEditOffers } from './get-event-edit-offers';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import { getEventEditDatalist } from './get-event-edit-datalist';
import { getEventTypes } from './get-event-types';


function createEventEditTemplate({point, destination, destinationsList, offersTypes, currentTypeOffers, isLocked}) {
  const {basePrice, type, saveBtnText, deleteBtnText} = point;

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
            <fieldset class="event__type-group" ${isLocked ? 'disabled' : ''}>
              ${getEventTypes(offersTypes, type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input
            class="event__input  event__input--destination" id="event-destination-1"
            type="text"
            name="event-destination"
            value="${destination.name}"
            list="destination-list-1"
            ${isLocked ? 'disabled' : ''}
          >

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
            pattern="^[0-9]+$"
            ${isLocked ? 'disabled' : ''}
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${saveBtnText}</button>
        <button class="event__reset-btn" type="reset">${deleteBtnText}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${getEventEditOffers(currentTypeOffers, point.offers, isLocked)}

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

    this._setState(this.#pointToState(this.#point));
    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate({
      point: this._state,
      destination: this.#pickCurrentDestination(),
      destinationsList: this.#destinations,
      offersTypes: this.#pickOffersTypes(),
      currentTypeOffers: this.#pickCurrentTypeOffers(),
      isLocked: this._state.saveBtnText === EditButtonsText.Saving || this._state.deleteBtnText === EditButtonsText.Deleting
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

  resetElement() {
    this.updateElement(this.#pointToState(this.#point));
  }

  #pointToState(point) {
    const newState = {
      ...point,
      saveBtnText: EditButtonsText.Save,
      deleteBtnText: this.#isNew ? EditButtonsText.Cancel : EditButtonsText.Delete
    };

    return newState;
  }

  #stateToPoint(state) {
    const newPoint = state;
    delete newPoint.saveBtnText;
    delete newPoint.deleteBtnText;

    return newPoint;
  }

  #setDatepickers () {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: dateFormats.edit,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
      },
    );
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: dateFormats.edit,
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
        destination: this.#destinations.find((destination) => destination.name === evt.target.value).id
      });
    }
  };

  #pickOffersTypes() {
    return this.#offers.map((offer) => offer.type);
  }

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
    this.#onFormCloseClickHandler();
  };

  #deleteClickHandler = () => {
    this.updateElement({
      deleteBtnText: EditButtonsText.Deleting,
    });
    this.#onDeleteClickHandler(this.#stateToPoint(this._state), this.#isNew);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    if (
      this._state.destination !== DEFAULT_DESTINATION.id &&
      this._state.destination !== DEFAULT_DESTINATION.name &&
      this._state.basePrice > 0
    ) {
      this.updateElement({
        saveBtnText: EditButtonsText.Saving
      });
      this.#onFormSubmitHandler(this.#stateToPoint(this._state), this.#isNew);

      if (this.#isNew) {
        this.#isNew = false;
      }
    } else {
      this.shake();
    }
  };
}
