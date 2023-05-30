import { render } from './framework/render.js';
import { DestinationsModel } from './model/destinationsModel.js';
import { OffersModel } from './model/offersModel.js';
import { PointsModel } from './model/pointsModel.js';
import TripPresenter from './presenter/trip-presenter.js';
import FiltersView from './view/filters.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const listContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const tripPresenter = new TripPresenter({
  headerContainerElement: siteTripMainElement,
  listContainerElement: listContainerElement,
  pointsModel,
  offersModel,
  destinationsModel
});

render(new FiltersView(), siteFiltersElement);

tripPresenter.init();
