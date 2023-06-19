import { UpdateType } from '../consts';
import Observable from '../framework/observable';


class DestinationsModel extends Observable{
  #destinations = [];
  #destinationsApiService = null;

  constructor ({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init () {
    try {
      const apiResponse = await this.#destinationsApiService.destinations;
      this.#destinations = apiResponse;
      this._notify(UpdateType.INIT);
      //console.log(this.#destinations);
    } catch(err) {
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }
}
export {DestinationsModel};
