import {render} from '../render.js';
import EventView from '../view/event.js';
import PointView from '../view/point/point.js';

export default class BoardPresenter {


  constructor({mainElement, pointsModel, offersModel}) {
    this.mainElement = mainElement;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.offersModel.getOffers()];

    const siteTripEventsElement = this.mainElement.querySelector('.trip-events__list');

    render(new PointView({
      point: this.points[0], // mock data, first point
      offers: this.offers.find((offer) => offer.type === 'taxi').offers.filter((offer) => this.points[0].offers.includes(offer.id)) // mock data, first point
    }), siteTripEventsElement);
    for (let i = 0; i < this.points.length; i++) {
      const currentTypeOffers = this.offers.find((offer) => offer.type === this.points[i].type).offers;
      const currentPointOffersList = this.points[i].offers;
      render(new EventView({
        point: this.points[i],
        offers: currentTypeOffers.filter((offer) => currentPointOffersList.includes(offer.id))
      }), siteTripEventsElement);
    }
  }
}
