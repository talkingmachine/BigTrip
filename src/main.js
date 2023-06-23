import { nanoid } from 'nanoid';
import PointsApiService from './api/points-api.js';
import { DestinationsModel } from './model/destinations-model.js';
import { FiltersModel } from './model/filters-model.js';
import { OffersModel } from './model/offers-model.js';
import { PointsModel } from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import DestinationsApiService from './api/destinations-api.js';
import OffersApiService from './api/offers-api.js';

const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = `Basic ${nanoid()}`;

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const listContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
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

destinationsModel.init();
offersModel.init();
pointsModel.init();

