import { RenderPosition, render, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit.js';
import EventView from '../view/event.js';
import EventsListView from '../view/events-list.js';
import HeaderView from '../view/header.js';
import EmptyView from '../view/empty.js';

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

    const siteHeaderElement = document.querySelector('.page-header');
    const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
    const siteEventListContainer = this.#mainElement.querySelector('.trip-events');

    if (this.#points.length > 0) {
      render(new HeaderView(this.#points), siteTripMainElement, RenderPosition.AFTERBEGIN);
      render(this.#eventListComponent, siteEventListContainer);
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderEvent(i);
      }
    } else {
      render(new EmptyView(), siteEventListContainer);
    }
  }

  #renderEvent(i) {
    const currentTypeOffers = this.#offers.find((offer) => offer.type === this.#points[i].type).offers;
    const currentPointOffersList = this.#points[i].offers;
    const eventData = {
      point: this.#points[i],
      offers: currentTypeOffers.filter((offer) => currentPointOffersList.includes(offer.id))
    };

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
