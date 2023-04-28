import { createElement } from '../../../render';

function createDestinationContentTemplate() {
  return `
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>`;
}

export default class DestinationContentView {
  getTemplate() {
    return createDestinationContentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
