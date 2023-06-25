import { sortType } from '../consts.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createSortTemplate({currentSortType}) {
  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === sortType.byDay ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === sortType.byTime ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === sortType.byPrice ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`;
}

export default class SortView extends AbstractStatefulView{
  #sortChangeHandler = null;

  constructor({currentSortType = sortType.byDay, sortChangeHandler}) {
    super();
    this.#sortChangeHandler = sortChangeHandler;
    this._setState({
      sortType: currentSortType
    });
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('change', (evt) => this.onSortChange(evt.target.value));
  }

  get template() {
    return createSortTemplate(this._state);
  }

  onSortChange = (currentSortType) => {
    this.updateElement({
      currentSortType
    });
    this.#sortChangeHandler(currentSortType);
  };
}
