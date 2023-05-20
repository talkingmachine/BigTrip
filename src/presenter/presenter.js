import { render, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit.js';
import EventView from '../view/event.js';
import EventsListView from '../view/events-list.js';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #mainElement = null;
  #pointsModel = null;
  #offersModel = null;

  #points;
  #offers;

  constructor({mainElement, pointsModel, offersModel}) {
    this.#mainElement = mainElement;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];

    const siteEventListContainer = this.#mainElement.querySelector('.trip-events');

    render(this.#eventListComponent, siteEventListContainer);
    for (let i = 0; i < this.#points.length; i++) {
      const currentTypeOffers = this.#offers.find((offer) => offer.type === this.#points[i].type).offers;
      const currentPointOffersList = this.#points[i].offers;
      const eventData = {
        point: this.#points[i],
        offers: currentTypeOffers.filter((offer) => currentPointOffersList.includes(offer.id))
      };

      this.#renderEvent(eventData);
    }
  }

  #renderEvent(eventData) {
    const eventComponent = new EventView({
      ...eventData,
      onEditClick: onEditClick
    });
    const eventEditComponent = new EventEditView(eventData);
    const formComponent = eventEditComponent.element.querySelector('.event--edit');
    const formRollupButtonComponent = formComponent.querySelector('.event__rollup-btn');

    const replaceEventToEdit = () => {
      replace(eventEditComponent, eventComponent);
    };
    const replaceEditToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const formRollupHandler = (evt) => {
      evt.preventDefault();
      replaceEditToEvent();
      removeListeners();
    };
    const formSubmitHandler = (evt) => {
      evt.preventDefault();
      // post something
      replaceEditToEvent();
      removeListeners();
    };
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToEvent();
        removeListeners();
      }
    };

    function onEditClick() {
      replaceEventToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
      formRollupButtonComponent.addEventListener('click', formRollupHandler);
      formComponent.addEventListener('submit', formSubmitHandler);
    }
    function removeListeners() {
      document.removeEventListener('keydown', escKeyDownHandler);
      formRollupButtonComponent.removeEventListener('keydown', formRollupHandler);
      formComponent.removeEventListener('submit', formSubmitHandler);
    }
    render(eventComponent, this.#eventListComponent.element);
  }
}
