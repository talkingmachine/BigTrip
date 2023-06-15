import Observable from '../framework/observable';
import { getMockDestinations } from '../mock/mockDestinations';


class DestinationsModel extends Observable{
  #destinations = getMockDestinations();

  get destinations() {
    return this.#destinations;
  }

  set destinations(destinations) {
    this.#destinations = destinations;
  }
}

export {DestinationsModel};
