import { getMockOffers } from '../mock/mockOffers';

class OffersModel {
  #offers = getMockOffers();

  get offers() {
    return this.#offers;
  }
}

export {OffersModel};
