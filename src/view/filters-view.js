import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createFiltersTemplate({currentFilter, activeFilters}) {
  return `
  <form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="everything"
      ${currentFilter === 'everything' ? 'checked' : ''}
      ${!activeFilters.everything ? 'disabled=""' : ''}
    >
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="future"
      ${currentFilter === 'future' ? 'checked' : ''}
      ${!activeFilters.future ? 'disabled=""' : ''}
    >
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-present"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="present"
      ${currentFilter === 'present' ? 'checked' : ''}
      ${!activeFilters.present ? 'disabled=""' : ''}
    >
      <label class="trip-filters__filter-label" for="filter-present">Present</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="past"
      ${currentFilter === 'past' ? 'checked' : ''}
      ${!activeFilters.past ? 'disabled=""' : ''}
    >
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
}


export default class FiltersView extends AbstractStatefulView{
  #filterChangeHandler = null;

  constructor({currentFilter, activeFilters, filterChangeHandler}) {
    super();
    this.#filterChangeHandler = filterChangeHandler;
    this._setState({
      currentFilter,
      activeFilters
    });
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('change', (evt) => this.onFilterChange(evt.target.value));
  }

  get template() {
    return createFiltersTemplate(this._state);
  }

  onFilterChange = (newFilter) => {
    this.updateElement({
      currentFilter: newFilter
    });
    this.#filterChangeHandler(newFilter);
  };

  onPointsChange = (newActiveFilters) => {
    this.updateElement({
      activeFilters: newActiveFilters
    });
  };
}
