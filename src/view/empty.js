import { FILTER_TYPES } from '../consts';
import AbstractView from '../framework/view/abstract-view';


function createEmptyTemplate(message) {
  return `
    <p class="trip-events__msg">${message}</p>
  `;
}
export default class EmptyView extends AbstractView{
  #filterType = null;

  constructor({filterType = null}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTemplate(this.#getMessage());
  }

  #getMessage() {
    switch (this.#filterType) {
      case FILTER_TYPES.Everything:
        return 'Click New Event to create your first point';
      case FILTER_TYPES.Past:
        return 'There are no past events now';
      case FILTER_TYPES.Present:
        return 'There are no present events now';
      case FILTER_TYPES.Future:
        return 'There are no future events now';
      case FILTER_TYPES.Loading:
        return 'Loading...';
    }
    return '';
  }
}
