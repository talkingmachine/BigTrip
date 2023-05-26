import { RenderPosition, render } from '../framework/render.js';
import HeaderView from '../view/header.js';

export default class HeaderPresenter {
  #tripMainElement = null;
  #points = null;

  constructor({tripMainElement, points}) {
    this.#tripMainElement = tripMainElement;
    this.#points = points;
  }

  init() {
    if (this.#points.length > 0) {
      render(new HeaderView(this.#points), this.#tripMainElement, RenderPosition.AFTERBEGIN);
    }
  }
}
