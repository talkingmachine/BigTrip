import { render } from '../framework/render.js';
import EventsListView from '../view/events-list.js';
import EmptyView from '../view/empty.js';
import EventPresenter from './event-presenter.js';
import HeaderPresenter from './header-presenter.js';
import { updateItem } from '../utils/updateItems.js';
import SortView from '../view/sort.js';
import { sortEventsByDay, sortEventsByPrice, sortEventsByTime } from '../utils/sorting-options.js';

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
      this.#renderSort();
      this.#renderHeader();
      this.#renderEvents(this.#points);
    } else {
      this.#renderEmpty();
    }
  }

  #sortPointsHandler = (sortType) => {
    const prevPoints = JSON.parse(JSON.stringify(this.#points));
    switch (sortType) {
      case 'sort-day':
        sortEventsByDay(prevPoints);
        break;
      case 'sort-time':
        sortEventsByTime(prevPoints);
        break;
      case 'sort-price':
        sortEventsByPrice(prevPoints);
        break;
    }

    if (JSON.stringify(prevPoints) !== JSON.stringify(this.#points)) {
      this.#renderEvents(prevPoints);
      this.#points = prevPoints;
    }
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#eventPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #pointsCloseEditMode = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.closeEditMode());
  };

  #renderSort() {
    const sortView = new SortView({
      sortHandler: this.#sortPointsHandler
    });
    render(sortView, this.#listContainerElement);
  }

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

  #renderEvents(events) {
    if (!this.#listContainerElement.contains(this.#eventsListComponent.element)) {
      render(this.#eventsListComponent, this.#listContainerElement);
    }
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    for (let i = 0; i < events.length; i++) {
      this.#renderEvent(events[i]);
    }
  }

  #renderHeader() {
    const headerPresenter = new HeaderPresenter({
      tripMainElement: this.#headerContainerElement,
      points: this.#points,
    });
    headerPresenter.init();
  }
}
