import BoardPresenter from './presenter/presenter.js';
import {RenderPosition, render} from './render.js';
import EventsListView from './view/events-list.js';
import FiltersView from './view/filters.js';
import HeaderView from './view/header.js';
import SortView from './view/sort.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');

const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({mainElement: siteMainElement});

render(new HeaderView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteFiltersElement);
render(new SortView(), siteTripEventsElement);
render(new EventsListView(), siteTripEventsElement);


boardPresenter.init();
