import { UpdateType } from '../consts';
import Observable from '../framework/observable';

class OffersModel extends Observable{
  #offers = [];
  #offersApiService = null;

  constructor ({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init () {
    try {
      const apiResponse = await this.#offersApiService.offers;
      this.#offers = apiResponse;
      this._notify(UpdateType.INIT);
      //console.log(this.#offers);
    } catch(err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }
}

export {OffersModel};
