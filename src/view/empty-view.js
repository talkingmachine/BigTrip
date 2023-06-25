import { FilterTypes } from '../consts';
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
      case FilterTypes.everything:
        return 'Click New Event to create your first point';
      case FilterTypes.past:
        return 'There are no past events now';
      case FilterTypes.present:
        return 'There are no present events now';
      case FilterTypes.future:
        return 'There are no future events now';
      case FilterTypes.loading:
        return 'Loading...';
    }
    return '';
  }
}
