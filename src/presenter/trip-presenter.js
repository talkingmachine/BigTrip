import { render, replace } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EmptyView from '../view/empty-view.js';
import EventPresenter from './event-presenter.js';
import HeaderPresenter from './header-presenter.js';
import SortView from '../view/sort.js';
import { sortEventsByPrice, sortEventsByTime } from '../utils/sort-filter-options.js';
import { FilterTypes, SortType, UpdateType, UserAction } from '../consts.js';
import { DEFAULT_POINT } from '../consts.js';


export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #emptyViewComponent = new EmptyView({});
  #newEventButtonElement = document.querySelector('.trip-main__event-add-btn');
  #headerContainerElement = null;
  #listContainerElement = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filtersModel = null;
  #currentSortType = SortType.byDay;
  #eventPresenters = new Map();
  #loadedData = 0;

  constructor({headerContainerElement, listContainerElement, pointsModel, offersModel, destinationsModel, filtersModel}) {
    this.#headerContainerElement = headerContainerElement;
    this.#listContainerElement = listContainerElement;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filtersModel;

    this.#filtersModel.addObserver(() => {
      this.#handleViewAction(UpdateType.MINOR);
      this.#updateEmpty(this.#filtersModel.filter);
    });
    this.#pointsModel.addObserver((updateType, data) => {
      this.#handleViewAction(updateType, data);
    });
    this.#offersModel.addObserver((updateType, data) => {
      this.#handleViewAction(updateType, data);
    });
    this.#destinationsModel.addObserver((updateType, data) => {
      this.#handleViewAction(updateType, data);
    });

    this.#newEventButtonElement.addEventListener('click', this.#addNewPointHandler);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.byTime:
        return [...this.#pointsModel.points].sort(sortEventsByTime).filter(this.#filtersModel.filterCallback);
      case SortType.byPrice:
        return [...this.#pointsModel.points].sort(sortEventsByPrice).filter(this.#filtersModel.filterCallback);
    }
    return this.#pointsModel.points.filter(this.#filtersModel.filterCallback);
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderSort();
    this.#renderEventsList();
    this.#updateEmpty(FilterTypes.Loading);
  }

  #sortPointsHandler = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#clearEvents();
      this.#renderEvents();
    }
  };

  #handleModelEvent = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        await this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        await this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        await this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleViewAction = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({resetSortType: true});
        this.#renderEvents();
        break;
      case UpdateType.INIT:
        this.#loadedData += 1;
        if (this.#loadedData === 3) {
          this.#updateEmpty();
          this.#renderHeader();
          this.#renderEvents();
        }
    }
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

  #clearEvents(resetSortType = false) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = SortType.byDay;
    }
  }

  #renderEventsList() {
    if (!this.#listContainerElement.contains(this.#eventsListComponent.element)) {
      render(this.#eventsListComponent, this.#listContainerElement);
    }
  }

  #renderEvents() {
    this.#updateEmpty(this.#filtersModel.filter);
    for (let i = 0; i < this.points.length; i++) {
      this.#renderEvent(this.points[i]);
    }
  }

  #renderEvent(event, isNew = false) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleModelEvent,
      pointsCloseEditMode: this.#pointsCloseEditMode,
      isNew: isNew
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #updateEmpty(filterType) {
    const newEmptyView = this.points.length === 0 ? new EmptyView({filterType}) : new EmptyView({});

    if (this.#listContainerElement.contains(this.#emptyViewComponent.element)) {
      replace(newEmptyView, this.#emptyViewComponent);
    } else {
      render(newEmptyView, this.#listContainerElement);
    }
    this.#emptyViewComponent = newEmptyView;
  }

  #renderHeader() {
    const headerPresenter = new HeaderPresenter({
      tripMainElement: this.#headerContainerElement,
      points: this.points,
      destinations: this.destinations
    });
    headerPresenter.init();
  }

  #addNewPointHandler = () => {
    this.#renderEvent(DEFAULT_POINT(), true);
  };
}
