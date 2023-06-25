import { UpdateType } from '../consts';
import Observable from '../framework/observable';


class DestinationsModel extends Observable{
  #destinations = [];
  #isDataUploaded = false;
  #destinationsApiService = null;

  constructor ({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init () {
    try {
      const apiResponse = await this.#destinationsApiService.destinations;
      this.#destinations = apiResponse;
      this.#isDataUploaded = Boolean(this.#destinations.length);
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }

  get isDataUploaded() {
    return this.#isDataUploaded;
  }
}
export {DestinationsModel};
