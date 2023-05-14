import { getMockPoints } from '../mock/mockPoints';

class PointsModel {
  points = getMockPoints();

  getPoints() {
    return this.points;
  }
}

export {PointsModel};
