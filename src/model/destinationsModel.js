import { getMockDestinations } from '../mock/mockDestinations';


class DestinationsModel {
  #destinations = getMockDestinations();

  get destinations() {
    return this.#destinations;
  }
}

export {DestinationsModel};
