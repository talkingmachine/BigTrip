import { getMockOffers } from '../mock/mockOffers';

class OffersModel {
  offers = getMockOffers();

  getOffers() {
    return this.offers;
  }
}

export {OffersModel};
