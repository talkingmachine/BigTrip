import { UpdateType } from '../consts';
import Observable from '../framework/observable';

class OffersModel extends Observable{
  #offers = [];
  #isDataUploaded = false;
  #offersApiService = null;

  constructor ({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init () {
    try {
      const apiResponse = await this.#offersApiService.offers;
      this.#offers = apiResponse;
      this.#isDataUploaded = true;
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }

  get isDataUploaded() {
    return this.#isDataUploaded;
  }
}

export {OffersModel};
