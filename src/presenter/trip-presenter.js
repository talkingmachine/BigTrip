import { RenderPosition, render, replace } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EmptyView from '../view/empty-view.js';
import EventPresenter from './event-presenter.js';
import HeaderPresenter from './header-presenter.js';
import SortView from '../view/sort-view.js';
import { getFilterCallback, sortEventsByPrice, sortEventsByTime } from '../utils/sort-filter-options.js';
import { FilterTypes, sortType, UpdateType, UserAction } from '../consts.js';
import { DEFAULT_POINT } from '../consts.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import FiltersView from '../view/filters-view.js';


export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #emptyViewComponent = new EmptyView({});
  #filtersViewComponent = null;
  #sortViewComponent = null;
  #newEventButtonViewComponent = null;
  #siteTripMainElement = null;
  #siteFiltersElement = null;
  #listContainerElement = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #currentFilter = FilterTypes.everything;
  #currentSortType = sortType.byDay;
  #eventPresenters = new Map();

  constructor({siteTripMainElement, listContainerElement, siteFiltersElement, pointsModel, offersModel, destinationsModel}) {
    this.#siteTripMainElement = siteTripMainElement;
    this.#listContainerElement = listContainerElement;
    this.#siteFiltersElement = siteFiltersElement;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver((updateType, data) => {
      this.#handleViewAction(updateType, data);
      this.#filtersViewComponent.onPointsChange(this.#getActiveFilters());
    });
    this.#offersModel.addObserver((updateType, data) => {
      this.#handleViewAction(updateType, data);
    });
    this.#destinationsModel.addObserver((updateType, data) => {
      this.#handleViewAction(updateType, data);
    });
  }

  get points() {
    switch (this.#currentSortType) {
      case sortType.byTime:
        return [...this.#pointsModel.points].sort(sortEventsByTime).filter(getFilterCallback(this.#currentFilter));
      case sortType.byPrice:
        return [...this.#pointsModel.points].sort(sortEventsByPrice).filter(getFilterCallback(this.#currentFilter));
    }
    return this.#pointsModel.points.filter(getFilterCallback(this.#currentFilter));
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderNewEventButton();
    this.#renderEventsList();
    this.#renderFilters();
    this.#updateEmpty(FilterTypes.loading);
  }

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
        if (this.#pointsModel.isDataUploaded && this.#destinationsModel.isDataUploaded && this.#offersModel.isDataUploaded) {
          this.#newEventButtonViewComponent.unlockNewEventButton();
          this.#updateEmpty();
          this.#renderHeader();
          this.#renderSort();
          this.#renderEvents();
        }
    }
  };

  #renderNewEventButton() {
    this.#newEventButtonViewComponent = new NewEventButtonView({
      onAddNewPoint: this.#addNewPointHandler
    });
    render(this.#newEventButtonViewComponent, this.#siteTripMainElement);
  }

  #renderSort() {
    this.#sortViewComponent = new SortView({
      curretSortType: this.#currentSortType,
      sortChangeHandler: (newSort) => {
        this.#currentSortType = newSort;
        this.#handleViewAction(UpdateType.MINOR);
      }
    });
    render(this.#sortViewComponent, this.#listContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    this.#filtersViewComponent = new FiltersView({
      currentFilter: this.#currentFilter,
      activeFilters: this.#getActiveFilters(),
      filterChangeHandler: (newFilter) => {
        this.#currentFilter = newFilter;
        this.#handleViewAction(UpdateType.MINOR);
        this.#updateEmpty(newFilter);
      }
    });
    render(this.#filtersViewComponent, this.#siteFiltersElement);
  }

  #renderEventsList() {
    if (!this.#listContainerElement.contains(this.#eventsListComponent.element)) {
      render(this.#eventsListComponent, this.#listContainerElement);
    }
  }

  #renderEvents() {
    this.#updateEmpty(this.#currentFilter);
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
      onPointsCloseEditMode: this.#onPointsCloseEditMode,
      isNew: isNew,
      onResetNewButtonState: this.#newEventButtonViewComponent.unlockNewEventButton
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderHeader() {
    const headerPresenter = new HeaderPresenter({
      tripMainElement: this.#siteTripMainElement,
      points: this.points,
      destinations: this.destinations
    });
    headerPresenter.init();
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

  #clearEvents(resetSortType = false) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = sortType.byDay;
    }
  }

  #addNewPointHandler = () => {
    this.#filtersViewComponent.onFilterChange(FilterTypes.everything);
    this.#sortViewComponent.onSortChange(sortType.byDay);
    this.#renderEvent(DEFAULT_POINT(), true);
  };

  #onPointsCloseEditMode = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.closeEditMode());
  };

  #getActiveFilters() {
    return {
      [FilterTypes.everything]: Boolean(this.#pointsModel.points.filter(getFilterCallback(FilterTypes.everything)).length),
      [FilterTypes.future]: Boolean(this.#pointsModel.points.filter(getFilterCallback(FilterTypes.future)).length),
      [FilterTypes.past]: Boolean(this.#pointsModel.points.filter(getFilterCallback(FilterTypes.past)).length),
      [FilterTypes.present]: Boolean(this.#pointsModel.points.filter(getFilterCallback(FilterTypes.present)).length),
    };
  }
}
