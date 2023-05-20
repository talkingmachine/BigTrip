import { getMockPoints } from '../mock/mockPoints';

class PointsModel {
  #points = getMockPoints();

  get points() {
    return this.#points;
  }
}

export {PointsModel};
