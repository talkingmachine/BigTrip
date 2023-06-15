import Observable from '../framework/observable';
import { getMockOffers } from '../mock/mockOffers';

class OffersModel extends Observable{
  #offers = getMockOffers();

  get offers() {
    return this.#offers;
  }

  set offers(offers) {
    this.#offers = offers;
  }
}

export {OffersModel};
