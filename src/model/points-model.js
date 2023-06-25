import { UpdateType } from '../consts';
import Observable from '../framework/observable';
import { sortEventsByDay } from '../utils/sort-filter-options';

class PointsModel extends Observable{
  #points = [];
  #isDataUploaded = false;
  #pointsApiService = null;

  constructor ({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init () {
    try {
      const apiResponse = await this.#pointsApiService.points;
      this.#points = apiResponse.map(this.#adaptServerToClient);
      this.#isDataUploaded = true;
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#points = [];
    }
  }

  get points() {
    return this.#points;
  }

  get isDataUploaded() {
    return this.#isDataUploaded;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    const updatedPoint = await this.#pointsApiService.updatePoint(update);

    this.#points = [
      ...this.#points.slice(0, index),
      this.#adaptServerToClient(updatedPoint),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  async addPoint(updateType, update) {
    if (this.#points.find((point) => point.id === update.id)) {
      return;
    }

    const newPoint = await this.#pointsApiService.addPoint(update);

    this.#points = [
      this.#adaptServerToClient(newPoint),
      ...this.#points,
    ].sort(sortEventsByDay);
    this._notify(updateType, update);
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    await this.#pointsApiService.deletePoint(update);

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }

  #adaptServerToClient(point) {
    const clientPoint = {
      ...point,
      basePrice: point.base_price,
      dateTo: point.date_to,
      dateFrom: point.date_from,
      isFavorite: point.is_favorite
    };

    delete clientPoint.base_price;
    delete clientPoint.date_from;
    delete clientPoint.date_to;
    delete clientPoint.is_favorite;

    return clientPoint;
  }
}

export {PointsModel};
