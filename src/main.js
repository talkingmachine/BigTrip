import { DestinationsModel } from './model/destinationsModel.js';
import { FiltersModel } from './model/filtersModel.js';
import { OffersModel } from './model/offersModel.js';
import { PointsModel } from './model/pointsModel.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const listContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filtersModel = new FiltersModel();
const tripPresenter = new TripPresenter({
  headerContainerElement: siteTripMainElement,
  listContainerElement: listContainerElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel
});
const filtersPresenter = new FiltersPresenter({
  filtersContainerElement: siteFiltersElement,
  filtersModel,
  pointsModel
});

tripPresenter.init();
filtersPresenter.init();
