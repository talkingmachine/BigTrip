import { remove, render, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit.js';
import EventView from '../view/event.js';

export default class EventPresenter {
  #eventsListContainer = null;
  #offers = null;
  #currentTypeOffers = null;
  #currentPointOffersList = null;
  #event = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #onDatachange = null;
  #pointsCloseEditMode = null;


  constructor({eventsListContainer, offers, onDatachange, pointsCloseEditMode}) {
    this.#eventsListContainer = eventsListContainer;
    this.#offers = offers;
    this.#onDatachange = onDatachange;
    this.#pointsCloseEditMode = pointsCloseEditMode;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#currentTypeOffers = this.#offers.find((offer) => offer.type === this.#event.type).offers;
    this.#currentPointOffersList = this.#event.offers;
    const eventData = {
      point: this.#event,
      offers: this.#currentTypeOffers.filter((offer) => this.#currentPointOffersList.includes(offer.id))
    };
    this.#eventComponent = new EventView({
      ...eventData,
      replaceEventToEdit: this.#replaceEventToEdit,
      onEscKeydownHandler: this.#onEscKeydownHandler,
      onStarClickHandler: this.#onStarClick
    });
    this.#eventEditComponent = new EventEditView({
      ...eventData,
      replaceEditToEvent: this.#replaceEditToEvent,
      onEscKeydownHandler: this.#onEscKeydownHandler
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#eventsListContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }
    if (this.#eventsListContainer.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  closeEditMode = () => {
    if (this.#eventsListContainer.contains(this.#eventEditComponent.element)) {
      replace(this.#eventComponent, this.#eventEditComponent);
    }
  };

  #replaceEventToEdit = () => {
    this.#pointsCloseEditMode();
    replace(this.#eventEditComponent, this.#eventComponent);
  };

  #replaceEditToEvent = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
  };

  #onEscKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', this.#onEscKeydownHandler);
      this.#replaceEditToEvent();
    }
  };

  #onStarClick = () => {
    this.#onDatachange({...this.#event, isFavorite: !this.#event.isFavorite});
  };
}
