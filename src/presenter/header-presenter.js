import { RenderPosition, render } from '../framework/render.js';
import HeaderView from '../view/header.js';

export default class HeaderPresenter {
  #tripMainElement = null;
  #points = null;
  #addNewPointHandler = null;

  constructor({tripMainElement, points, addNewPointHandler}) {
    this.#tripMainElement = tripMainElement;
    this.#points = points;
    this.#addNewPointHandler = addNewPointHandler;
  }

  init() {
    if (this.#points.length > 0) {
      const headerView = new HeaderView({
        points: this.#points,
        addNewPointHandler: this.#addNewPointHandler
      });
      render(headerView, this.#tripMainElement, RenderPosition.AFTERBEGIN);
    }
  }
}
