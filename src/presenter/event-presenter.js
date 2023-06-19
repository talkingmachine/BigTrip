import { UpdateType, UserAction } from '../consts.js';
import { RenderPosition, remove, render, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit.js';
import EventView from '../view/event.js';

export default class EventPresenter {
  #eventsListContainer = null;
  #offers = null;
  #destinations = null;
  #currentTypeOffers = null;
  #currentPointOffersList = null;
  #event = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #onDataChange = null;
  #pointsCloseEditMode = null;
  #isNew = false;


  constructor({eventsListContainer, offers, destinations, onDataChange, pointsCloseEditMode, isNew}) {
    this.#eventsListContainer = eventsListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onDataChange = onDataChange;
    this.#pointsCloseEditMode = pointsCloseEditMode;
    this.#isNew = isNew;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#currentTypeOffers = this.#offers.find((offer) => offer.type === this.#event.type).offers;
    this.#currentPointOffersList = this.#event.offers;

    this.#eventComponent = new EventView({
      point: this.#event,
      offers: this.#currentTypeOffers.filter((offer) => this.#currentPointOffersList.includes(offer.id)),
      destination: this.#destinations.find((destination) => destination.id === this.#event.destination).name,
      replaceEventToEdit: this.#replaceEventToEdit,
      onEscKeydownHandler: this.#onEscKeydownHandler,
      onStarClickHandler: this.#onStarClick
    });
    this.#eventEditComponent = new EventEditView({
      point: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormCloseClickHandler: this.#onFormCloseClickHandler,
      onFormSubmitHandler: this.#onFormSubmitHandler,
      onDeleteClickHandler: this.#onDeleteClickHandler,
      isNew: this.#isNew
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      if (this.#isNew) {
        this.#pointsCloseEditMode();
      }
      render(
        this.#isNew ? this.#eventEditComponent : this.#eventComponent,
        this.#eventsListContainer,
        this.#isNew ? RenderPosition.AFTERBEGIN : RenderPosition.BEFOREEND);
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

  #onFormSubmitHandler = (point) => {
    try {
      this.#onDataChange(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point,
      );
    } catch {
      this.#onDataChange(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point,
      );
    }

    this.#replaceEditToEvent();
  };

  #onFormCloseClickHandler = () => {
    this.#replaceEditToEvent();
  };

  #onEscKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', this.#onEscKeydownHandler);
      this.#replaceEditToEvent();
    }
  };

  #onDeleteClickHandler = (point, isNew = false) => {
    if (isNew) {
      remove(this.#eventEditComponent);
    } else {
      this.#onDataChange(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point,
      );
    }
  };

  #onStarClick = () => {
    this.#onDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#event, isFavorite: !this.#event.isFavorite},
    );
  };
}
