import { render } from '../framework/render.js';
import EventsListView from '../view/events-list.js';
import EmptyView from '../view/empty.js';
import EventPresenter from './event-presenter.js';
import HeaderPresenter from './header-presenter.js';
import { updateItem } from '../utils/updateItems.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #headerContainerElement = null;
  #listContainerElement = null;
  #pointsModel = null;
  #offersModel = null;
  #points = null;
  #offers = null;
  #eventPresenters = new Map();

  constructor({headerContainerElement, listContainerElement, pointsModel, offersModel}) {
    this.#headerContainerElement = headerContainerElement;
    this.#listContainerElement = listContainerElement;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];

    if (this.#points.length > 0) {
      this.#renderHeader();
      this.#renderEventList();
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderEvent(this.#points[i]);
      }
    } else {
      this.#renderEmpty();
    }
  }

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#eventPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #pointsCloseEditMode = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.closeEditMode());
  };

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      offers: this.#offers,
      onDatachange: this.#pointChangeHandler,
      pointsCloseEditMode: this.#pointsCloseEditMode
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEmpty() {
    render(new EmptyView(), this.#listContainerElement);
  }

  #renderEventList() {
    render(this.#eventsListComponent, this.#listContainerElement);
  }

  #renderHeader() {
    const headerPresenter = new HeaderPresenter({
      tripMainElement: this.#headerContainerElement,
      points: this.#points,
    });
    headerPresenter.init();
  }
}
