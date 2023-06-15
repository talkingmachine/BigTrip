import { render } from '../framework/render';
import FiltersView from '../view/filters';

export default class FiltersPresenter {
  #filtersContainerElement = null;
  #filtersModel = null;

  constructor({filtersContainerElement, filtersModel}) {
    this.#filtersContainerElement = filtersContainerElement;
    this.#filtersModel = filtersModel;
  }

  get filter() {
    return this.#filtersModel.filter;
  }

  set filter(newFilter) {
    this.#filtersModel.filter = newFilter;
  }

  init() {
    this.#renderFilters();
  }

  #renderFilters() {
    const filtersView = new FiltersView({
      currentFilter: this.filter,
      filterChangeHandler: this.#filterChangeHandler
    });
    render(filtersView, this.#filtersContainerElement);
  }

  #filterChangeHandler = (evt) => {
    this.filter = evt.target.value;
  };

}
