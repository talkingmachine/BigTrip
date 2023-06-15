import Observable from '../framework/observable';
import { getMockPoints } from '../mock/mockPoints';
import { eventsByDay } from '../utils/sort-filter-options';

class PointsModel extends Observable{
  #points = getMockPoints();

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    if (this.#points.find((point) => point.id === update.id)) {
      return;
    }
    this.#points = [
      update,
      ...this.#points,
    ].sort(eventsByDay);
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }
}

export {PointsModel};
