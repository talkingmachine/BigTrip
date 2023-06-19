import { RenderPosition, render } from '../framework/render.js';
import HeaderView from '../view/header.js';

export default class HeaderPresenter {
  #tripMainElement = null;
  #points = null;
  #destinations = null;

  constructor({tripMainElement, points, destinations}) {
    this.#tripMainElement = tripMainElement;
    this.#points = points;
    this.#destinations = destinations;
  }

  init() {
    if (this.#points.length > 0) {
      const headerView = new HeaderView({
        points: this.#points,
        destinations: this.#destinations
      });
      render(headerView, this.#tripMainElement, RenderPosition.AFTERBEGIN);
    }
  }
}
