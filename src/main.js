import { render } from './framework/render.js';
import { OffersModel } from './model/offersModel.js';
import { PointsModel } from './model/pointsModel.js';
import BoardPresenter from './presenter/presenter.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const boardPresenter = new BoardPresenter({
  mainElement: siteMainElement,
  pointsModel,
  offersModel
});

render(new FiltersView(), siteFiltersElement);
render(new SortView(), siteTripEventsElement);

boardPresenter.init();
